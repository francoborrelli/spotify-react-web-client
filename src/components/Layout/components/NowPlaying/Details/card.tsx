import { Col, Row } from 'antd';
import { FC } from 'react';

interface NowPlayingCardProps {
  title: string;

  extra?: any;
  children?: any;
  image?: string;
  subtitle?: string;
  imageTitle?: string;
}

export const NowPlayingCard: FC<NowPlayingCardProps> = (props) => {
  return (
    <div className='playing-now-card'>
      {props.image ? (
        <div
          className='playing-now-card-image'
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%), url("${props.image}")`,
          }}
        >
          <div className='playing-now-card-image-text'>
            <div data-encore-id='text'>
              <div className='zZdI03asKaUCNlbhjDAv'>{props.imageTitle}</div>
            </div>
          </div>
        </div>
      ) : null}

      <div className='playing-now-card-text'>
        <Row align='middle' justify='space-between'>
          <Col span={props.extra ? 14 : 24}>
            <div
              className='playing-now-card-title'
              style={props.image ? undefined : { marginTop: 10 }}
            >
              {props.title}
            </div>
            <div className='playing-now-card-subtitle'>{props.subtitle}</div>
          </Col>
          {props.extra ? <Col span={10}>{props.extra}</Col> : null}
        </Row>
        {props.children ? <div className='playing-now-card-body'>{props.children}</div> : null}
      </div>
    </div>
  );
};
