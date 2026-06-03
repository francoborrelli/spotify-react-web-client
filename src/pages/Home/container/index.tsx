// Components
import { Row } from 'antd';
import { HomeHeader } from './header';
import { HomeAllMusicSection } from './sections/AllMusicSection';
import { HomePodcastSection } from './sections/PodcastSection';

// Utils
import { FC, memo, RefObject, useRef, useState } from 'react';
import useIsMobile from '../../../utils/isMobile';

// Store
import { useAppSelector } from '../../../store/store';

interface HomePageContainerProps {
  container: RefObject<HTMLDivElement | null>;
}

const PODCAST_PAGE_COLOR = '#2f2c2a';

const HomePageContainer: FC<HomePageContainerProps> = memo((props) => {
  const { container } = props;
  const [color, setColor] = useState('rgb(66, 32, 35)');

  const isMobile = useIsMobile();
  const sectionContainerRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => !!state.auth.user);
  const section = useAppSelector((state) => state.home.section);

  const pageColor = section === 'PODCAST' ? PODCAST_PAGE_COLOR : color;

  return (
    <div ref={sectionContainerRef}>
      <HomeHeader color={pageColor} container={container} sectionContainer={sectionContainerRef} />
      <div
        className={`Home-seccion${section === 'PODCAST' ? ' Home-seccion--podcasts' : ''}`}
        style={{
          paddingTop: isMobile ? 50 : 0,
          transition: section === 'PODCAST' ? undefined : 'background 5s',
          background: `linear-gradient(180deg, ${pageColor} 2%, rgb(18, 18, 18) 11%)`,
        }}
      >
        <Row gutter={user ? [16, 8] : undefined}>
          {section === 'PODCAST' ? (
            <HomePodcastSection />
          ) : (
            <HomeAllMusicSection setColor={setColor} />
          )}
        </Row>
      </div>
    </div>
  );
});

export default HomePageContainer;
