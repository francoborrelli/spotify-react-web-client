import { memo, type FC, type ReactNode } from 'react';

import { Col, Flex, Row } from 'antd';
import { CloseIcon } from '../../../../Icons';

// Redux
import { useAppDispatch } from '../../../../../store/store';
import { uiActions } from '../../../../../store/slices/ui';
import { Link } from 'react-router-dom';

interface NowPlayingLayoutProps {
  children: any;
  link?: string;
  title?: string;
  extra?: ReactNode;
}

const CloseButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className='playing-section-close-button'>
      <button
        onClick={() => {
          dispatch(uiActions.collapseQueue());
          dispatch(uiActions.collapseDetails());
          dispatch(uiActions.collapseDevices());
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export const NowPlayingLayout: FC<NowPlayingLayoutProps> = memo((props) => {
  const title = props.title ? (
    <div className='playing-section-title-container'>
      <span className='playing-section-title'>{props.title}</span>
    </div>
  ) : null;

  return (
    <div className='playing-section'>
      <Row align='middle'>
        <Col span={props.extra ? 19 : 20}>
          {props.link ? (
            <Link className='title-link' to={props.link}>
              {title}
            </Link>
          ) : (
            title
          )}
        </Col>
        <Col span={props.extra ? 5 : 4}>
          <Flex justify='space-between' gap={5} align='center'>
            {props.extra}
            <CloseButton />
          </Flex>
        </Col>
      </Row>

      <div className='playlist-section-content' style={{ height: '100%' }}>
        {props.children}
      </div>
    </div>
  );
});

NowPlayingLayout.displayName = 'NowPlayingLayout';
