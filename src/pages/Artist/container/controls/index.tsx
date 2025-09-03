import { Col, Row, Space, Tooltip } from 'antd';

import { PlayCircleButton } from './playCircle';
import { FollowArtistButton } from './followButton';
import { MenuDots } from '../../../../components/Icons';
import { ArtistActionsWrapper } from '../../../../components/Actions/ArtistActions';

// Utils
import { useTranslation } from 'react-i18next';

// Interfaces
import type { FC } from 'react';
import { useAppSelector } from '../../../../store/store';

export const ArtistControls: FC = () => {
  const [tor] = useTranslation(['order']);
  const artist = useAppSelector((state) => state.artist.artist);

  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space align='center'>
            <PlayCircleButton />

            <div style={{ marginRight: 10 }}>
              <FollowArtistButton id={artist!.id} />
            </div>

            <ArtistActionsWrapper artist={artist!} trigger={['click']}>
              <div>
                <Tooltip title={`${tor('More options for')} ${artist?.name}`}>
                  <div className='scale'>
                    <MenuDots />
                  </div>
                </Tooltip>
              </div>
            </ArtistActionsWrapper>
          </Space>
        </Col>
      </Row>
    </div>
  );
};
