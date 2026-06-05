/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, FC, memo, useCallback } from 'react';
import { useAppDispatch } from '../../store/store';
import { spotifyActions } from '../../store/slices/spotify';
import { playerService } from '../../services/player';

export interface WebPlaybackProps {
  onPlayerError: (message: string) => void; // Función para manejar errores del reproductor
  onPlayerRequestAccessToken: () => Promise<string>; // Función para obtener el token de acceso
  onPlayerLoading: () => void; // Notificación de que el reproductor está cargando
  onPlayerWaitingForDevice: (data: any) => void; // Notificación de que el reproductor espera el dispositivo
  onPlayerDeviceSelected: () => void; // Notificación de que se ha seleccionado el dispositivo
  playerName: string; // Nombre del reproductor
  playerInitialVolume: number; // Volumen inicial del reproductor (0 a 1)
  playerRefreshRateMs?: number; // Frecuencia de actualización del estado del reproductor en ms
  playerAutoConnect?: boolean; // Si el reproductor se conecta automáticamente o no
  children?: any; // Elementos hijos para renderizar dentro del componente
}

const WebPlayback: FC<WebPlaybackProps> = memo((props) => {
  const dispatch = useAppDispatch();

  const { playerName, playerInitialVolume } = props;
  const { playerRefreshRateMs, playerAutoConnect, children } = props;
  const { onPlayerWaitingForDevice, onPlayerDeviceSelected } = props;
  const { onPlayerError, onPlayerLoading, onPlayerRequestAccessToken } = props;

  const webPlaybackInstance = useRef<Spotify.Player | null>(null);
  const statePollingInterval = useRef<NodeJS.Timeout | null>(null);
  const deviceSelectedInterval = useRef<NodeJS.Timeout | null>(null);

  const handleState = async (state: any | null) => {
    if (state) {
      dispatch(spotifyActions.setState({ state }));
    } else {
      clearStatePolling();
      await waitForDeviceToBeSelected();
    }
  };

  const waitForSpotify = useCallback(() => {
    return new Promise<void>((resolve) => {
      if ('Spotify' in window) {
        resolve();
      } else {
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve();
        };
      }
    });
  }, []);

  const waitForDeviceToBeSelected = () => {
    return new Promise((resolve) => {
      // Clear any prior poller first. Without this, every `null` state event (which happens
      // during device transfers) stacked another no-delay interval, flooding the store with
      // `setState` dispatches → "Maximum update depth exceeded".
      if (deviceSelectedInterval.current) clearInterval(deviceSelectedInterval.current);
      deviceSelectedInterval.current = setInterval(() => {
        if (webPlaybackInstance.current) {
          webPlaybackInstance.current.getCurrentState().then((state) => {
            if (state !== null) {
              startStatePolling();
              clearInterval(deviceSelectedInterval.current!);
              resolve(state);
            }
          });
        }
      }, 1000);
    });
  };

  const startStatePolling = useCallback(() => {
    // Guard against stacking multiple pollers, which would multiply the per-tick `setState`
    // dispatches and can trigger "Maximum update depth exceeded".
    if (statePollingInterval.current) clearInterval(statePollingInterval.current);
    statePollingInterval.current = setInterval(async () => {
      const state = await webPlaybackInstance.current!.getCurrentState();
      await handleState(state);
    }, playerRefreshRateMs || 1000);
  }, [playerRefreshRateMs]);

  const clearStatePolling = useCallback(() => {
    if (statePollingInterval.current) clearInterval(statePollingInterval.current);
  }, []);

  const setupWebPlaybackEvents = useCallback(async () => {
    let { Player } = window.Spotify;
    // Register the device name so playback can re-resolve the live device id by name when the
    // SDK reconnects with a new id (otherwise play 404s with "Device not found").
    playerService.setPlaybackDeviceName(playerName);
    webPlaybackInstance.current = new Player({
      name: playerName,
      enableMediaSession: true,
      volume: playerInitialVolume,
      getOAuthToken: async (callback) => {
        const userAccessToken = await onPlayerRequestAccessToken();
        callback(userAccessToken);
      },
    });

    webPlaybackInstance.current.on('initialization_error', (e) => {
      console.log('initialization_error', e);
      onPlayerError(e.message);
    });

    webPlaybackInstance.current.on('authentication_error', (e) => {
      console.log('authentication_error', e);
      onPlayerError(e.message);
    });

    webPlaybackInstance.current.on('account_error', (e) => {
      console.log('account_error', e);
      onPlayerError(e.message);
    });

    webPlaybackInstance.current.on('playback_error', (e) => {
      console.log('playback_error', e);
      onPlayerError(e.message);
    });

    webPlaybackInstance.current.on('player_state_changed', async (state) => {
      console.log(state);
      await handleState(state);
    });

    webPlaybackInstance.current.on('ready', async (data) => {
      dispatch(spotifyActions.setDeviceId({ deviceId: data.device_id }));
      dispatch(spotifyActions.setActiveDevice({ activeDevice: data.device_id }));
      // Persist the live device id immediately (independently of the transfer below) so
      // playback commands always carry it, even across hot-reloads.
      playerService.setPlaybackDevice(data.device_id);
      // The device takes a moment to register server-side after `ready`, so an immediate
      // transfer often 404s ("Device not found"). Retry a few times with backoff. The id is
      // already stored by transferPlayback, so play works even if transfer never succeeds.
      for (let attempt = 0; attempt < 4; attempt++) {
        try {
          await playerService.transferPlayback(data.device_id);
          break;
        } catch (e) {
          if (attempt === 3) {
            console.warn('transferPlayback failed after retries:', e);
          } else {
            await new Promise((resolve) => setTimeout(resolve, 800));
          }
        }
      }
    });

    if (playerAutoConnect) {
      webPlaybackInstance.current.connect();
      dispatch(spotifyActions.setPlayer({ player: webPlaybackInstance.current }));

      // Browsers block audio until a user gesture. The Web Playback SDK exposes
      // `activateElement()` for exactly this — call it once on the first interaction so the
      // device can actually produce sound (otherwise playback silently fails).
      const activateOnce = () => {
        try {
          (webPlaybackInstance.current as any)?.activateElement?.();
        } catch {
          /* no-op */
        }
        document.removeEventListener('click', activateOnce);
        document.removeEventListener('keydown', activateOnce);
      };
      document.addEventListener('click', activateOnce);
      document.addEventListener('keydown', activateOnce);
    }
  }, [
    playerName,
    playerInitialVolume,
    playerAutoConnect,
    onPlayerRequestAccessToken,
    onPlayerError,
    handleState,
    dispatch,
  ]);

  const setupWaitingForDevice = useCallback(() => {
    return new Promise((resolve) => {
      webPlaybackInstance.current!.on('ready', (data) => {
        resolve(data);
      });
    });
  }, []);

  useEffect(() => {
    const initializePlayer = async () => {
      onPlayerLoading();
      await waitForSpotify();
      await setupWebPlaybackEvents();
      const device_data = await setupWaitingForDevice();
      onPlayerWaitingForDevice(device_data);
      await waitForDeviceToBeSelected();
      onPlayerDeviceSelected();
    };

    initializePlayer();

    return () => {
      clearStatePolling();
      if (deviceSelectedInterval.current) clearInterval(deviceSelectedInterval.current);
      webPlaybackInstance.current?.disconnect();
    };
  }, []);

  return <>{children}</>;
});

export default WebPlayback;
