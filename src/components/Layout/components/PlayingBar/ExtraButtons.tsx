// Components
import { Col, Row } from 'antd';
import VolumeControls from './Volume';
import { Tooltip } from '../../../Tooltip';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

// Icons
import { DetailsIcon, DeviceIcon, ExpandIcon, ListIcon, MicrophoneIcon } from '../../../Icons';

// I18n
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { languageActions } from '../../../../store/slices/language';
import { libraryActions } from '../../../../store/slices/library';
import { FullScreenPlayer } from '../../../FullScreen';

const LyricsButton = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['playingBar']);

  return (
    <Tooltip title={t('Lyrics')}>
      <button
        style={{ marginLeft: 5, marginRight: 5 }}
        onClick={() => dispatch(languageActions.openLanguageModal())}
      >
        <MicrophoneIcon />
      </button>
    </Tooltip>
  );
};

const DetailsButton = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['playingBar']);

  const queue = useAppSelector((state) => state.library.queue);
  const actions = useAppSelector((state) => state.library.detailsOpen);
  const songPlaying = useAppSelector((state) => state.library.songPlaying);

  const active = actions && !!songPlaying && !queue;

  return (
    <>
      <Tooltip title={t('Now playing view')}>
        <button
          disabled={!songPlaying}
          className={active ? 'active-icon-button' : ''}
          onClick={() => dispatch(libraryActions.toggleSongPlaying())}
          style={{
            marginLeft: 5,
            marginRight: 10,
            cursor: songPlaying ? 'pointer' : 'not-allowed',
          }}
        >
          <DetailsIcon active={active} />
        </button>
      </Tooltip>
    </>
  );
};

const QueueButton = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['playingBar']);

  const isQueueOpen = useAppSelector((state) => state.library.queue);
  const actions = useAppSelector((state) => state.library.detailsOpen);

  const active = actions && !!isQueueOpen;

  return (
    <Tooltip title={t('Queue')}>
      <button
        className={active ? 'active-icon-button' : ''}
        onClick={() =>
          isQueueOpen ? dispatch(libraryActions.closeQueue()) : dispatch(libraryActions.openQueue())
        }
        style={{
          marginLeft: 10,
          marginRight: 5,
          cursor: isQueueOpen ? 'pointer' : 'not-allowed',
        }}
      >
        <ListIcon active={active} />
      </button>
    </Tooltip>
  );
};

const ExpandButton = () => {
  const { t } = useTranslation(['playingBar']);

  const handle = useFullScreenHandle();
  const isQueueOpen = useAppSelector((state) => state.library.queue);

  return (
    <>
      <FullScreen handle={handle}>
        <FullScreenPlayer onExit={handle.exit} />
      </FullScreen>

      <Tooltip title={t('Full Screen')}>
        <button
          onClick={handle.enter}
          style={{
            marginRight: 5,
            cursor: isQueueOpen ? 'pointer' : 'not-allowed',
          }}
        >
          <ExpandIcon />
        </button>
      </Tooltip>
    </>
  );
};

const ExtraControlButtons = () => {
  const { t } = useTranslation(['playingBar']);

  return (
    <div>
      <Row gutter={18} align='middle'>
        <DetailsButton />

        <LyricsButton />

        <QueueButton />

        <Tooltip title={t('Connect to a device')}>
          <Col className='hiddable-icon'>
            <DeviceIcon />
          </Col>
        </Tooltip>

        <Col>
          <VolumeControls />
        </Col>

        <Col>
          <ExpandButton />
        </Col>
      </Row>
    </div>
  );
};

export default ExtraControlButtons;
