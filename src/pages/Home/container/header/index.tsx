import { Space } from 'antd';
import { FC, memo, RefObject } from 'react';
import Chip from '../../../../components/Chip';
import { PageHeader } from '../../../../components/Layout/components/Header';
import { PodcastSegmentedNav } from './PodcastSegmentedNav';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { homeActions } from '../../../../store/slices/home';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

interface HomeHeaderProps {
  color: string;
  container: RefObject<HTMLDivElement | null>;
  sectionContainer: RefObject<HTMLDivElement | null>;
}

const MAIN_SECTIONS: { key: 'ALL' | 'MUSIC'; label: 'ALL' | 'MUSIC' }[] = [
  { key: 'ALL', label: 'ALL' },
  { key: 'MUSIC', label: 'MUSIC' },
];

const ChipsSection = memo(() => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['home']);
  const section = useAppSelector((state) => state.home.section);

  if (section === 'PODCAST') {
    return (
      <Space className='home-header-filters' wrap size={[4, 4]}>
        {MAIN_SECTIONS.map((item) => (
          <Chip
            key={item.key}
            text={t(item.label)}
            active={false}
            onClick={() => dispatch(homeActions.setSection(item.key))}
          />
        ))}
        <PodcastSegmentedNav />
      </Space>
    );
  }

  return (
    <Space className='home-header-filters' wrap size={[4, 4]}>
      {[...MAIN_SECTIONS, { key: 'PODCAST' as const, label: 'PODCASTS' as const }].map((item) => (
        <Chip
          key={item.key}
          text={t(item.label)}
          active={section === item.key}
          onClick={() => dispatch(homeActions.setSection(item.key))}
        />
      ))}
    </Space>
  );
});

export const HomeHeader: FC<HomeHeaderProps> = (props) => {
  const user = useAppSelector((state) => state.auth.user);

  const { container, sectionContainer, color } = props;

  if (!user) {
    return null;
  }

  return (
    <PageHeader
      color={color}
      activeHeider={20}
      container={container}
      sectionContainer={sectionContainer}
    >
      <ChipsSection />
    </PageHeader>
  );
};
