import type { FC } from 'react';

import { Col, Row } from 'antd';
import { CloseIcon } from '../../../../Icons';

// Redux
import { useAppDispatch } from '../../../../../store/store';
import { uiActions } from '../../../../../store/slices/ui';

interface NowPlayingLayoutProps {
  children: any;
  title?: string;
}

const CloseButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className='playing-section-close-button'>
      <button
        onClick={() => {
          dispatch(uiActions.collapseQueue());
          dispatch(uiActions.collapseDetails());
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export const NowPlayingLayout: FC<NowPlayingLayoutProps> = (props) => {
  return (
    <div className='playing-section'>
      <Row align='middle'>
        <Col span={20}>
          {props.title ? (
            <div className='playing-section-title-container'>
              <p className='playing-section-title'>{props.title}</p>
            </div>
          ) : null}
        </Col>
        <Col span={4}>
          <CloseButton />
        </Col>
      </Row>

      <div className='playlist-section-content' style={{ height: '100%' }}>
        {props.children}
      </div>
    </div>
  );
};
