import React, { Component, Fragment } from 'react';

let webPlaybackSdkProps = {
  playerName: 'Spotify React Player',
  playerInitialVolume: 1.0,
  playerRefreshRateMs: 100,
  playerAutoConnect: true,
  onPlayerRequestAccessToken: () => this.state.token,
  onPlayerLoading: () => this.setState({ playerLoaded: true }),
  onPlayerWaitingForDevice: data =>
    this.setState({ playerSelected: false, userDeviceId: data.device_id }),
  onPlayerDeviceSelected: () => this.setState({ playerSelected: true }),
  onPlayerStateChange: playerState =>
    this.setState({ playerState: playerState }),
  onPlayerError: playerError => console.error(playerError)
};

export default class WebPlayback extends Component {
  deviceSelectedInterval = null;
  statePollingInterval = null;
  webPlaybackInstance = null;

  state = {
    playerReady: false,
    playerSelected: false
  };

  async handleState(state) {
    if (state) {
      this.props.onPlayerStateChange(state);
    } else {
      let {
        _options: { id: device_id }
      } = this.webPlaybackInstance;

      this.clearStatePolling();
      this.props.onPlayerWaitingForDevice({ device_id: device_id });
      await this.waitForDeviceToBeSelected();
      this.props.onPlayerDeviceSelected();
    }
  }

  waitForSpotify() {
    return new Promise(resolve => {
      if ('Spotify' in window) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve();
        };
      }
    });
  }

  waitForDeviceToBeSelected() {
    return new Promise(resolve => {
      this.deviceSelectedInterval = setInterval(() => {
        if (this.webPlaybackInstance) {
          this.webPlaybackInstance.getCurrentState().then(state => {
            if (state !== null) {
              this.startStatePolling();
              clearInterval(this.deviceSelectedInterval);
              resolve(state);
            }
          });
        }
      });
    });
  }

  startStatePolling() {
    this.statePollingInterval = setInterval(async () => {
      let state = await this.webPlaybackInstance.getCurrentState();
      await this.handleState(state);
    }, this.props.playerRefreshRateMs || 1000);
  }

  clearStatePolling() {
    clearInterval(this.statePollingInterval);
  }

  async setupWebPlaybackEvents() {
    let { Player } = window.Spotify;

    this.webPlaybackInstance = new Player({
      name: this.props.playerName,
      volume: this.props.playerInitialVolume,
      getOAuthToken: async callback => {
        if (typeof this.props.onPlayerRequestAccessToken !== 'undefined') {
          let userAccessToken = await this.props.onPlayerRequestAccessToken();
          callback(userAccessToken);
        }
      }
    });

    this.webPlaybackInstance.on('initialization_error', e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('authentication_error', e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('account_error', e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('playback_error', e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('player_state_changed', async state => {
      await this.handleState(state);
    });

    this.webPlaybackInstance.on('ready', data => {
      this.props.onPlayerWaitingForDevice(data);
    });

    if (this.props.playerAutoConnect) {
      this.webPlaybackInstance.connect();
    }
  }

  setupWaitingForDevice() {
    return new Promise(resolve => {
      this.webPlaybackInstance.on('ready', data => {
        resolve(data);
      });
    });
  }

  async componentWillMount() {
    // Notify the player is loading
    this.props.onPlayerLoading();

    // Wait for Spotify to load player
    await this.waitForSpotify();

    // Setup the instance and the callbacks
    await this.setupWebPlaybackEvents();

    // Wait for device to be ready
    let device_data = await this.setupWaitingForDevice();
    this.props.onPlayerWaitingForDevice(device_data);

    // Wait for device to be selected
    await this.waitForDeviceToBeSelected();
    this.props.onPlayerDeviceSelected();
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
