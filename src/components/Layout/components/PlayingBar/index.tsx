import SongDetails from './SongDetails';
import PlayControls from './PlayControls';
import ExtraControlButtons from './ExtraButtons';
import NowPlayingBarMobile from './mobilePlayer';
import { MobileMenu } from './mobileMenu';

const NowPlayingBar = () => {
  return (
    <>
      <div className='w-full bg-black p-4 flex items-center justify-between h-full mobile-hidden'>
        <SongDetails />
        <PlayControls />
        <ExtraControlButtons />
      </div>

      <div className='mobile-bar'>
        <NowPlayingBarMobile />
        <MobileMenu />
      </div>
    </>
  );
};

export default NowPlayingBar;
