import { FC, memo, RefObject, useMemo, useState } from 'react';

// Components
import { Dropdown, Flex, Space } from 'antd';
import { ArrowDownIcon, ArrowUpIcon } from '../../../components/Icons';
import { PageHeader } from '../../../components/Layout/components/Header';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { artistDiscographyActions } from '../../../store/slices/discography';

interface ArtistPageProps {
  color: string;
  container: RefObject<HTMLDivElement | null>;
  sectionContainer: RefObject<HTMLDivElement | null>;
}

const FilterSection = memo(() => {
  const [t] = useTranslation(['artist']);

  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.artistDiscography.filter);
  const albums = useAppSelector((state) => state.artistDiscography.albums);
  const singles = useAppSelector((state) => state.artistDiscography.singles);
  const compilations = useAppSelector((state) => state.artistDiscography.compilations);

  const [open, setOpen] = useState(true);

  const items = useMemo(() => {
    const result = [];
    if (albums.length) result.push('Album');
    if (singles.length) result.push('Singles');
    if (compilations.length) result.push('Compilations');
    if (result.length) result.unshift('All');
    return result;
  }, [albums, singles, compilations]);

  if (!items.length) return null;

  return (
    <Dropdown
      trigger={['click']}
      onOpenChange={setOpen}
      placement='bottomRight'
      menu={{
        items: items.map((item) => ({
          key: item,
          label: t(item),
          onClick: () => {
            dispatch(artistDiscographyActions.setFilter({ filter: item as any }));
          },
        })),
        selectedKeys: [filter],
      }}
    >
      <button className='order-button'>
        <Space align='center'>
          <span style={{ fontSize: '0.875rem' }}>{t(filter)}</span>
          {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </Space>
      </button>
    </Dropdown>
  );
});

// const ViewSection = () => {
//   return (
//     <Space>
//       <button className='addButton'>
//         <GridIcon />
//       </button>
//     </Space>
//   );
// };

export const ArtistDicographyHoverableMenu: FC<ArtistPageProps> = memo((props) => {
  const artist = useAppSelector((state) => state.artistDiscography.artist);

  return (
    <PageHeader {...props} activeHeider={0} activeContentHeight={0}>
      <Flex style={{ marginTop: 20 }} align='center' justify='space-between'>
        <h1 className='playlist-header'>{artist?.name}</h1>

        <Space align='center' size={20}>
          <FilterSection />
          {/* <ViewSection /> */}
        </Space>
      </Flex>
    </PageHeader>
  );
});

export default ArtistDicographyHoverableMenu;
