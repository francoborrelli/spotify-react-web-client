import { useTranslation } from 'react-i18next';
import { Clock } from '../../../components/Icons';
import { useAppSelector } from '../../../store/store';

export const PlaylistTableHeader = () => {
  const { t } = useTranslation(['playlist']);
  const view = useAppSelector((state) => state.playlist.view);
  const isList = view === 'LIST';

  return (
    <div className='mobile-hidden flex justify-between items-center py-2'>
      <div style={{ flex: 1 }}>
        <h3 className='column-name text-center'>#</h3>
      </div>
      <div style={{ flex: 8 }}>
        <h3 className='column-name text-left'>{t('Title')}</h3>
      </div>

      {!isList ? (
        <div style={{ flex: 5 }}>
          <h3 className='column-name text-left'>{t('Artist')}</h3>
        </div>
      ) : null}

      <div style={{ flex: 5 }}>
        <h3 className='column-name tablet-hidden text-left'>{t('Album')}</h3>
      </div>
      <div style={{ flex: 3 }}>
        <h3 className='column-name tablet-hidden text-left'>{t('Date Added')}</h3>
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
