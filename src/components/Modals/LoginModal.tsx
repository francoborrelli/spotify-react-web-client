/* eslint-disable no-useless-computed-key */
import { Modal } from 'antd';

import { memo, useCallback, useEffect, useState } from 'react';
import { WhiteButton } from '../Button';

// Redux
import { uiActions } from '../../store/slices/ui';
import { loginToSpotify } from '../../store/slices/auth';
import { useAppDispatch, useAppSelector } from '../../store/store';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../constants/spotify';

// Utils
import tinycolor from 'tinycolor2';
import { useTranslation } from 'react-i18next';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';
import useIsMobile from '../../utils/isMobile';

export const LoginModal = memo(() => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['home']);
  const isMobile = useIsMobile();

  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>(DEFAULT_PAGE_COLOR);

  const imgUrl = useAppSelector((state) => state.ui.loginModalItem);

  const onClose = useCallback(() => {
    dispatch(uiActions.closeLoginModal());
  }, [dispatch]);

  useEffect(() => {
    if (imgUrl) {
      getImageAnalysis2(imgUrl).then((color) => {
        let colorObj = tinycolor(color);
        while (colorObj.isLight()) {
          colorObj = colorObj.darken(10);
        }
        setColor(colorObj.toHexString());
        setOpen(true);
      });
    }
    return () => {
      setOpen(false);
    };
  }, [imgUrl]);

  if (!imgUrl) return null;

  return (
    <>
      <Modal
        centered
        width={780}
        open={open}
        footer={null}
        destroyOnClose
        onCancel={onClose}
        className='login-modal'
        wrapClassName='overlay-modal'
        style={{
          // @ts-ignore
          ['--background-color']: color,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <div className='img-container'>
            <img alt='' loading='lazy' src={imgUrl} />
          </div>
          <div className='content-container'>
            <h2 style={{ lineHeight: 1.4 }}>{t('Start listening with a free Spotify account')}</h2>

            <div style={{ marginTop: 25 }}>
              <WhiteButton
                title={t('Log In')}
                onClick={() => {
                  dispatch(loginToSpotify(false));
                }}
              ></WhiteButton>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
});

LoginModal.displayName = 'LoginModal';
