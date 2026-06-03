import { Flex } from 'antd';
import { memo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { GridItemComponent } from '../../../../components/Lists/list';
import { ScrollableGridCarousel } from '../../../../components/Lists/ScrollableGridCarousel';
import { getItemDescription } from '../../../../utils/getDescription';
import type { MoreLikeArtistSection as MoreLikeArtistSectionData } from '../../../../store/slices/home';

interface MoreLikeArtistSectionProps {
  section: MoreLikeArtistSectionData;
}

export const MoreLikeArtistSection: FC<MoreLikeArtistSectionProps> = memo(({ section }) => {
  const { t } = useTranslation(['home', 'artist']);
  const { artist, items } = section;
  const avatar = artist.images[0]?.url;

  if (!items.length) {
    return null;
  }

  return (
    <div className='home more-like-artist'>
      <Flex className='grid-item-list-header more-like-artist__header' justify='space-between' align='flex-end'>
        <Link to={`/artist/${artist.id}`} className='more-like-artist-header' style={{ textDecoration: 'none' }}>
          {avatar ? (
            <img className='more-like-artist-header__avatar' src={avatar} alt='' width={48} height={48} />
          ) : null}
          <div className='more-like-artist-header__text'>
            <span className='more-like-artist-header__label'>{t('More like')}</span>
            <span className='more-like-artist-header__name'>{artist.name}</span>
          </div>
        </Link>
        <Link to={`/artist/${artist.id}`}>
          <button type='button' className='showMore more-like-artist__show-more'>
            <span>{t('Show more', { ns: 'artist' })}</span>
          </button>
        </Link>
      </Flex>

      <ScrollableGridCarousel>
        {items.map((item) => (
          <div key={item.uri} className='horizontal-grid-carousel__item' style={{ position: 'relative' }}>
            <GridItemComponent item={item} getDescription={getItemDescription} />
          </div>
        ))}
      </ScrollableGridCarousel>
    </div>
  );
});
