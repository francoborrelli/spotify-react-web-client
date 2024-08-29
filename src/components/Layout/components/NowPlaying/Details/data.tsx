import { Col, Row } from 'antd';

import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface NowPlayingCardProps {
  title: string;
  albumId: string;
  extra?: any;
  children?: any;
  image?: string;
  imageTitle?: string;
  subtitle?: string | ReactNode;
}

export const NowPlayingCard: FC<NowPlayingCardProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div className='playing-now-card'>
      {props.image ? (
        <div
          onClick={() => navigate(`/album/${props.albumId}`)}
          className='playing-now-card-image'
          style={{
            cursor: 'pointer',
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

      <div className='playing-now-card-text'>
        <Row align='middle' justify='space-between'>
          <Col span={props.extra ? 20 : 24}>
            <div
              className='playing-now-card-title'
              style={props.image ? undefined : { marginTop: 10 }}
            >
              {props.title}
            </div>
            <div className='playing-now-card-subtitle'>{props.subtitle}</div>
          </Col>
          {props.extra ? (
            <Col span={2} style={{ textAlign: 'right' }}>
              {props.extra}
            </Col>
          ) : null}
        </Row>
        {props.children ? <div className='playing-now-card-body'>{props.children}</div> : null}
      </div>
    </div>
  );
};
