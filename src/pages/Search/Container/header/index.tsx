import { Space } from 'antd';
import { FC, RefObject } from 'react';
import Chip from '../../../../components/Chip';
import { PageHeader } from '../../../../components/Layout/components/Header';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useAppSelector } from '../../../../store/store';
import { useNavigate, useParams } from 'react-router-dom';

interface HomeHeaderProps {
  color: string;
  container: RefObject<HTMLDivElement | null>;
  sectionContainer: RefObject<HTMLDivElement | null>;
}

const SECTIONS = ['ALL', 'ARTISTS', 'TRACKS', 'ALBUMS', 'PLAYLISTS'];

export const SearchHeader: FC<HomeHeaderProps> = (props) => {
  const { container, sectionContainer, color } = props;

  const navigate = useNavigate();
  const [t] = useTranslation(['home']);

  const params = useParams<{ search: string }>();
  const section = useAppSelector((state) => state.search.section);

  return (
    <PageHeader
      color={color}
      activeHeider={20}
      container={container}
      sectionContainer={sectionContainer}
    >
      <div>
        <Space size={10} style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
          {SECTIONS.map((item) => (
            <Chip
              key={item}
              text={t(item)}
              active={section === item}
              onClick={() =>
                navigate(`/search/${params.search}/${item === 'ALL' ? '' : item?.toLowerCase()}`)
              }
            />
          ))}
        </Space>
      </div>
    </PageHeader>
  );
};
