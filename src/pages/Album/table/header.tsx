import { useTranslation } from 'react-i18next';
import { Clock } from '../../../components/Icons';

export const PlaylistTableHeader = () => {
  const { t } = useTranslation(['playlist']);

  return (
    <div className='mobile-hidden flex justify-between items-center py-2'>
      <div style={{ flex: 1 }}>
        <h3 className='column-name text-center'>#</h3>
      </div>
      <div style={{ flex: 8 }}>
        <h3 className='column-name text-left'>{t('Title')}</h3>
      </div>
      <div style={{ flex: 1 }} className='tablet-hidden'></div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <h3 style={{ marginRight: 10, textAlign: 'right' }}>
          <Clock />
        </h3>
      </div>
      <div style={{ flex: 1 }} className='tablet-hidden'></div>
    </div>
  );
};
