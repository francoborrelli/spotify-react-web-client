import { FC, memo, useEffect, useMemo, useState } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */
import { Space } from 'antd';
import Chip from '../../../../components/Chip';
import { ItemsList } from '../../../Home/components/list';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useAppSelector } from '../../../../store/store';

const ChipsSection: FC<{ activeKey: string; setActiveKey: (str: string) => void }> = memo(
  (props) => {
    const [t] = useTranslation(['artist']);
    const { activeKey, setActiveKey } = props;

    const albums = useAppSelector((state) => state.artist.albums);
    const singles = useAppSelector((state) => state.artist.singles);
    const compilations = useAppSelector((state) => state.artist.compilations);

    const chips = useMemo(() => {
      if (!albums.length && !singles.length && !compilations.length) {
        return [];
      }

      const items = ['Popular releases'];

      if (albums.length) {
        items.push('Albums');
      }
      if (singles.length) {
        items.push('Singles and EPs');
      }

      if (compilations.length) {
        items.push('Compilations');
      }
      return items;
    }, [albums, singles, compilations]);

    useEffect(() => {
      if (chips.length) setActiveKey(chips[0]);
    }, [chips]);

    if (!chips.length || chips.length === 2) return null;

    return (
      <Space style={{ margin: '0px 15px', marginBottom: 15 }}>
        {chips.map((chip) => (
          <Chip
            key={chip}
            text={t(chip)}
            active={activeKey === chip}
            onClick={() => setActiveKey(chip)}
          />
        ))}
      </Space>
    );
  }
);

export const Discography = memo(() => {
  const [t] = useTranslation(['artist']);
  const albums = useAppSelector((state) => state.artist.albums);
  const singles = useAppSelector((state) => state.artist.singles);
  const compilations = useAppSelector((state) => state.artist.compilations);

  const [activeKey, setActiveKey] = useState('Popular releases');

  const items = useMemo(() => {
    switch (activeKey) {
      case 'Albums':
        return albums;
      case 'Singles and EPs':
        return singles;
      case 'Compilations':
        return compilations;
      default:
        return [...albums, ...singles, ...compilations];
    }
  }, [activeKey, albums, singles, compilations]);

  return (
    <div>
      <div>
        <ItemsList
          items={items}
          title={t('Discography')}
          chips={<ChipsSection activeKey={activeKey} setActiveKey={setActiveKey} />}
        />
      </div>
    </div>
  );
});
