/* eslint-disable jsx-a11y/alt-text */
import { FC, memo, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

// Utils
import tinycolor from 'tinycolor2';
import { getImageAnalysis } from '../../../utils/imageAnyliser';

// Interfaces
import type { Category } from '../../../interfaces/categories';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';

export const BrowseCard: FC<{ category: Category }> = memo(({ category }) => {
  const [color, setColor] = useState(DEFAULT_PAGE_COLOR);

  useEffect(() => {
    if (category.icons.length) {
      const { url } = category.icons[0];
      getImageAnalysis(url).then((color) => {
        setColor(tinycolor(color).saturate(60).lighten(30).toHexString());
      });
    }
  }, [category.icons]);

  return (
    <div>
      <Link to={`/genre/${category.id}`} className='browse-card'>
        <div className='browse-card-container' style={{ backgroundColor: color }}>
          <img loading='lazy' src={category.icons[0].url} />
          <span>{category.name}</span>
        </div>
      </Link>
    </div>
  );
});
