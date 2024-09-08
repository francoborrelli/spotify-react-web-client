// Components
import { AddPlaylistButton } from './AddPlaylistButton';
import { CloseIcon, LibraryCollapsedIcon, LibraryIcon } from '../../../Icons';

// Utils
import { memo } from 'react';

// Components
import { Flex, Space } from 'antd';
import { Tooltip } from '../../../Tooltip';

// I18n
import { useTranslation } from 'react-i18next';

// Redux
import { getLibraryCollapsed, uiActions } from '../../../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const isMobile = window.innerWidth < 900;

const CloseButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className='playing-section-close-button'>
      <button
        onClick={() => {
          dispatch(uiActions.collapseLibrary());
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export const LibraryTitle = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['navbar']);
  const collapsed = useAppSelector(getLibraryCollapsed);

  if (collapsed) {
    return (
      <Tooltip placement='right' title={t('Expand your library')}>
        <button
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          onClick={() => dispatch(uiActions.toggleLibrary())}
        >
          <LibraryCollapsedIcon />
        </button>
      </Tooltip>
    );
  }

  return (
    <Flex align='center' justify='space-between'>
      <Space wrap align='center'>
        <Tooltip placement='top' title={t('Collapse your library')}>
          <button onClick={() => dispatch(uiActions.toggleLibrary())}>
            <LibraryIcon />
          </button>
        </Tooltip>
        <span className='Navigation-button'>{t('Your Library')}</span>
      </Space>

      {isMobile ? <CloseButton /> : <AddPlaylistButton />}
    </Flex>
  );
});
