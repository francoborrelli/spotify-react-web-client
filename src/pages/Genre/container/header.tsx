import { FC, memo } from 'react';
import { Category } from '../../../interfaces/categories';

export const GenreHeader: FC<{ color: string; category: Category }> = memo((props) => {
  const { color } = props;

  return (
    <div className='genre-page-header'>
      <div className='container' style={{ backgroundColor: color }}></div>
      <div
        className='content'
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          background: `linear-gradient(transparent 0, rgba(0,0,0,.5) 100%), url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=)`,
        }}
      ></div>
      <div className='contentSpacing'>
        <div></div>
        <div className='textContainer'>
          <span>
            <h1>{props.category.name}</h1>
          </span>
        </div>
      </div>
    </div>
  );
});
