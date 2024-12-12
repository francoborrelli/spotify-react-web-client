import { Space } from 'antd';
import { FC, memo, RefObject } from 'react';
import Chip from '../../../../components/Chip';
import { PageHeader } from '../../../../components/Layout/components/Header';

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

const SECTIONS = ['ALL', 'MUSIC', 'PODCASTS'];

const ChipsSection = memo(() => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['home']);
  const section = useAppSelector((state) => state.home.section);

  return (
    <Space style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
      {SECTIONS.map((item) => (
        <Chip
          key={item}
          text={t(item)}
          active={section === item}
          onClick={() => dispatch(homeActions.setSection(item as any))}
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
