import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/store';
import { GridItemList } from '../../../components/Lists/list';
import { getPlaylistDescription } from '../../../utils/getDescription';
import tinycolor from 'tinycolor2';

export const GenreContent = memo((props: { color: string }) => {
  const [t] = useTranslation(['home']);
  const playlists = useAppSelector((state) => state.genre.playlists);

  return (
    <div
      style={{
        padding: 20,
        paddingTop: 30,
        maxHeight: 260,
        background: `linear-gradient(${
          tinycolor(props.color).isLight()
            ? tinycolor(props.color).darken(20)
            : tinycolor(props.color).darken(12)
        } 0, rgb(18 18 18) 100%), var(--background-noise)`,
      }}
      className='genre-list'
    >
      <GridItemList
        title={t('Popular playlists')}
        items={playlists}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
});

GenreContent.displayName = 'GenreContent';

export default GenreContent;
