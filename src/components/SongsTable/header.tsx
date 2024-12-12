import { useTranslation } from 'react-i18next';

import { FC, memo } from 'react';
import { Clock } from '../Icons';

interface ItemProps {
  isList: boolean;
}

interface TableHeaderProps {
  view: 'COMPACT' | 'LIST';
  fields: ((props: ItemProps) => React.ReactElement | null)[];
}

const Index = (props: ItemProps) => {
  return (
    <div style={{ flex: 1 }}>
      <h3 className='column-name text-center'>#</h3>
    </div>
  );
};

const Title = (props: ItemProps) => {
  const { t } = useTranslation(['playlist']);
  return (
    <div style={{ flex: 8 }}>
      <h3 className='column-name text-left'>{t('Title')}</h3>
    </div>
  );
};

const Album = (props: ItemProps) => {
  const { t } = useTranslation(['playlist']);
  return (
    <div style={{ flex: 5 }}>
      <h3 className='column-name tablet-hidden text-left'>{t('Album')}</h3>
    </div>
  );
};

const DateAdded = (props: ItemProps) => {
  const { t } = useTranslation(['playlist']);
  return (
    <div style={{ flex: 3 }}>
      <h3 className='column-name tablet-hidden text-left'>{t('Date Added')}</h3>
    </div>
  );
};

const Artists = (props: ItemProps) => {
  const { isList } = props;
  const { t } = useTranslation(['playlist']);

  if (isList) return null;
  return (
    <div style={{ flex: 5 }} className='tablet-hidden'>
      <h3 className='column-name text-left'>{t('Artist')}</h3>
    </div>
  );
};

const Time = (props: ItemProps) => {
  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <h3 style={{ marginRight: 10, textAlign: 'right' }}>
        <Clock />
      </h3>
    </div>
  );
};

const Space = (props: ItemProps) => {
  return <div style={{ flex: 1 }} className='tablet-hidden'></div>;
};

export const TableHeader: FC<TableHeaderProps> = memo((props) => {
  const { view, fields } = props;

  const isList = view === 'LIST';

  return (
    <div
      style={{ color: '#bababa' }}
      className='mobile-hidden flex justify-between items-center py-2'
    >
      {fields.map((Field, index) => (
        <Field key={index} isList={isList} />
      ))}
    </div>
  );
});

export default TableHeader;

export const TableHeaderComponents = {
  Index,
  Title,
  Artists,
  Time,
  Space,
  Album,
  DateAdded,
};
