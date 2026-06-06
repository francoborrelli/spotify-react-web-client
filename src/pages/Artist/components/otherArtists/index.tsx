import { memo } from 'react';

// Components
import { GridItemList } from '../../../../components/Lists/list';

// Redux
import { useAppSelector } from '../../../../store/store';

// Utils
import { useTranslation } from 'react-i18next';

export const OtherArtists = memo(() => {
  const [t] = useTranslation(['artist']);
  const artists = useAppSelector((state) => state.artist.otherArtists);

  // Related artists were removed from the Spotify API (no replacement), so this is always
  // empty now — hide the section instead of rendering a bare "Fans also like" header.
  if (!artists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList items={artists} title={t('Fans also like')} />
      </div>
    </div>
  );
});
