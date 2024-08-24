import type { FC } from 'react';

import { Col, Row } from 'antd';
import { CloseIcon } from '../../../../Icons';

// Redux
import { libraryActions } from '../../../../../store/slices/library';
import { useAppDispatch } from '../../../../../store/store';

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
          dispatch(libraryActions.removeSongPlaying());
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
          {props.title ? <p className='playing-section-title'>{props.title}</p> : null}
        </Col>
        <Col span={4}>
          <CloseButton />
        </Col>
      </Row>

      {props.children}
    </div>
  );
};
