import { getCurrentDevice, isActiveOnOtherDevice } from '../../../../store/slices/spotify';
import { uiActions } from '../../../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const OtherDeviceIcon = (
  <svg
    data-encore-id='icon'
    role='presentation'
    aria-hidden='true'
    className='Svg-sc-ytk21e-0 koDfUp VX33mI2V_jRA7hRBI9_0'
    viewBox='0 0 16 16'
  >
    <path d='M14.5 8a6.468 6.468 0 0 0-1.3-3.9l1.2-.9C15.405 4.537 16 6.2 16 8c0 1.8-.595 3.463-1.6 4.8l-1.2-.9A6.468 6.468 0 0 0 14.5 8zM8 1.5a6.5 6.5 0 1 0 3.25 12.13.75.75 0 1 1 .75 1.3 8 8 0 1 1 0-13.86.75.75 0 1 1-.75 1.298A6.467 6.467 0 0 0 8 1.5z'></path>
    <path d='M11.259 8c0-.676-.228-1.296-.611-1.791l1.187-.918c.579.749.924 1.69.924 2.709a4.41 4.41 0 0 1-.925 2.709l-1.186-.918c.383-.495.61-1.115.61-1.791zM8.75 4.115l-4.139 2.39a1.727 1.727 0 0 0 0 2.99l4.139 2.39v-7.77z'></path>
  </svg>
);

export const OtherDeviceAlert = () => {
  const dispatch = useAppDispatch();
  const currentDevice = useAppSelector(getCurrentDevice);
  const activeOnOtherDevice = useAppSelector(isActiveOnOtherDevice);

  if (!activeOnOtherDevice) return null;

  return (
    <div className='other-device-alert-container'>
      <button onClick={() => dispatch(uiActions.toggleDevices())}>
        {OtherDeviceIcon}

        <span>Playing on {currentDevice?.name}</span>
      </button>
    </div>
  );
};
