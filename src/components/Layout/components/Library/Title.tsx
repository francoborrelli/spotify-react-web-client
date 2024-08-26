// Icons
import { LibraryCollapsedIcon, LibraryIcon } from '../../../Icons';

// Utils
import { memo } from 'react';

// Components
import { Space } from 'antd';
import { Tooltip } from '../../../Tooltip';

// I18n
import { useTranslation } from 'react-i18next';

// Redux
import { uiActions } from '../../../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

export const LibraryTitle = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['navbar']);
  const collapsed = useAppSelector((state) => state.ui.libraryCollapsed);

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
    <Space wrap>
      <Tooltip placement='top' title={t('Collapse your library')}>
        <button onClick={() => dispatch(uiActions.toggleLibrary())}>
          <LibraryIcon />
        </button>
      </Tooltip>
      <span className='Navigation-button'>{t('Your Library')}</span>
    </Space>
  );
});
