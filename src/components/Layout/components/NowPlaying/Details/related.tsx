import { FC, memo } from 'react';
import { Song } from '../../../../../interfaces/types';
import { useAppDispatch } from '../../../../../store/store';
import { libraryActions } from '../../../../../store/slices/library';
import { Play } from '../../../../Icons';
import { useTranslation } from 'react-i18next';

export const RelatedSong: FC<{ song: Song }> = memo(({ song }) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['cv']);

  const onPlay = () => {
    dispatch(libraryActions.setSongPlaying(song));
  };

  return (
    <div className='queue-song'>
      <div className=' flex flex-row items-center'>
        <div className='queue-song-image-container'>
          <div className='queue-song-overlay' onClick={onPlay}>
            <Play />
          </div>
          <img alt='Album Cover' className='album-cover' src={song.imageUrl} />
        </div>

        <div id='song-and-artist-name'>
          <p className='text-white font-bold song-title' title={t(song.name)}>
            {t(song.name)}
          </p>
          <p className='text-gray-200 song-artist' title={t(song.artist || '')}>
            {t(song.artist || '')}
          </p>
        </div>
      </div>
    </div>
  );
});
