import { Space } from 'antd';

import NavigationButton from './NavigationButton';
import ForwardBackwardsButton from './ForwardBackwardsButton';

import { LiaLaptopCodeSolid } from 'react-icons/lia';

import { useTranslation } from 'react-i18next';
import { memo } from 'react';

const HistoryNavigation = memo(() => {
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
});

export default HistoryNavigation;
