import { Space } from 'antd';
import { FC, RefObject } from 'react';
import Chip from '../../../components/Chip';
import { PageHeader } from '../../../components/Layout/components/Header';
import { useAppSelector } from '../../../store/store';
import { capitalizeText } from '../../../utils/capitalize';

interface HomeHeaderProps {
  color: string;
  container: RefObject<HTMLDivElement>;
}

const SECTIONS = ['ALL', 'MUSIC', 'PODCASTS'];

export const HomeHeader: FC<HomeHeaderProps> = (props) => {
  const { container, color } = props;

  const section = useAppSelector((state) => state.home.section);

  return (
    <PageHeader color={color} container={container} activeHeider={20}>
      <Space style={{ marginLeft: 10, marginTop: 5 }}>
        {SECTIONS.map((item) => (
          <Chip
            key={item}
            active={section === item}
            text={capitalizeText(item)}
            onClick={() => console.log('Change section')}
          />
        ))}
      </Space>
    </PageHeader>
  );
};
