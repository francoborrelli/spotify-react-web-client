import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../../components/Tooltip';
import { useTranslation } from 'react-i18next';

const ForwardBackwardsButton = ({ flip }: { flip: boolean }) => {
  const navigate = useNavigate();
  const [t] = useTranslation(['navigation']);

  const navigateBack = () => {
    navigate(-1);
  };

  const navigateForward = () => {
    navigate(1);
  };

  return (
    <Tooltip title={flip ? t('Go back') : t('Go forward')}>
      <button
        className='bg-black p-2 rounded-full h-4/6 aspect-square h-8'
        onClick={flip ? navigateBack : navigateForward}
      >
        <img
          alt={flip ? 'Backwards' : 'Forward'}
          src={`${process.env.PUBLIC_URL}/images/forward.svg`}
          className={`w-full h-full ${flip ? 'rotate-180' : ''}`}
        />
      </button>
    </Tooltip>
  );
};

export default ForwardBackwardsButton;
