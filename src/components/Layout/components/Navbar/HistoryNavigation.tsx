import { Space } from 'antd';
import ForwardBackwardsButton from '../../../../pages/Home/ForwardBackwardsButton';
import NavigationButton from './NavigationButton';
import { LiaLaptopCodeSolid } from 'react-icons/lia';
import { useTranslation } from 'react-i18next';

const HistoryNavigation = () => {
  const { t } = useTranslation(['navbar']);
  return (
    <Space>
      <NavigationButton
        text={t('Source code')}
        onClick={() => {
          window.open('https://github.com/francoborrelli/portfolio', '_blank');
        }}
        icon={<LiaLaptopCodeSolid size={25} fill='white' />}
      />

      <div className='flex flex-row items-center gap-2 h-full'>
        <ForwardBackwardsButton flip />
        <ForwardBackwardsButton flip={false} />
      </div>
    </Space>
  );
};

export default HistoryNavigation;
