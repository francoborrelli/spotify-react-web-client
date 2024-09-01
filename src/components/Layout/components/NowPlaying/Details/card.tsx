import { Col, Row } from 'antd';

import type { FC } from 'react';
import { Link } from 'react-router-dom';

export const DetailsCard: FC<{ title: string; children: any; extra?: any }> = (props) => {
  const { title, children, extra } = props;
  return (
    <div className='now-playing-card'>
      <div className='title-section'>
        <div className='title'>{title}</div>
        {extra}
      </div>
      <div>{children}</div>
    </div>
  );
};

interface NowPlayingCardProps {
  id: string;
  title: string;
  extra?: any;
  children?: any;
  image?: string;
  subtitle?: string;
  imageTitle?: string;
}

export const ArtistsCard: FC<NowPlayingCardProps> = (props) => {
  return (
    <div className='artist-playing-now-card'>
      {props.image ? (
        <div
          className='playing-now-card-image'
          style={{
            maxHeight: 200,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%), url("${props.image}")`,
          }}
        >
          <div className='playing-now-card-image-text'>
            <div data-encore-id='text'>
              <div>{props.imageTitle}</div>
            </div>
          </div>
        </div>
      ) : null}

      <div className='playing-now-card-text' style={{ position: 'relative' }}>
        <Row align='middle' justify='space-between'>
          <Col>
            <div
              className='playing-now-card-title'
              style={props.image ? undefined : { marginTop: 10 }}
            >
              <Link to={`/artist/${props.id}`}>{props.title}</Link>
            </div>
            <div className='playing-now-card-subtitle'>{props.subtitle}</div>
          </Col>
          {props.extra ? <Col style={{ textAlign: 'right' }}>{props.extra}</Col> : null}
        </Row>
      </div>
    </div>
  );
};
