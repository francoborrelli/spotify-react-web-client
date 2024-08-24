import ControlButtons from './ControlButtons';
import SongProgressBar from './SongProgressBar';

const PlayControls = () => {
  return (
    <div style={{ marginTop: 5, marginBottom: -5 }} className='flex flex-col items-center w-2/5'>
      <ControlButtons />
      <SongProgressBar />
    </div>
  );
};

export default PlayControls;
