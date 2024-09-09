import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Popconfirm } from 'antd';
import { WhiteButton } from '../../../../Button';
import { DetailsCard } from '../../NowPlaying/Details/card';

// Redux
import { uiActions } from '../../../../../store/slices/ui';
import { loginToSpotify } from '../../../../../store/slices/auth';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

export const LibraryLoginInfo = memo(() => {
  const [t] = useTranslation(['home']);
  const dispatch = useAppDispatch();
  const tooltipOpen = useAppSelector((state) => state.ui.loginTooltipOpen);

  const onClose = useCallback(() => {
    dispatch(uiActions.closeLoginTooltip());
  }, [dispatch]);

  const onConfirm = useCallback(() => {
    return dispatch(loginToSpotify(false));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      onClose();
    };
  }, [onClose]);

  return (
    <Popconfirm
      icon={null}
      open={tooltipOpen}
      placement='left'
      onCancel={onClose}
      okText={t(`Log In`)}
      onConfirm={onConfirm}
      cancelText={t(`Not now`)}
      title={t('Create a playlist')}
      cancelButtonProps={{ type: 'text' }}
      okButtonProps={{ className: 'white-button small' }}
      description={t('Log in to create and share playlists.')}
    >
      <div style={{ marginRight: -5 }}>
        <DetailsCard title={t(`Let's access your library`)}>
          <p style={{ fontWeight: 400, color: '#fff' }}>
            {t(`Log In to access all the features of the app`)}
          </p>
          <div style={{ marginTop: 20, marginBottom: 30, position: 'relative' }}>
            <WhiteButton
              size='small'
              title={t('Log In')}
              onClick={() => dispatch(loginToSpotify(false))}
            />
          </div>
        </DetailsCard>
      </div>
    </Popconfirm>
  );
});
