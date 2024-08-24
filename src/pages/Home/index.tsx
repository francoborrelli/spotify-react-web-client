// Components
import { Col, Row } from 'antd';
import { PlaylistHorizontal } from './PlaylistHorizontal';

// Utils
import { useTranslation } from 'react-i18next';
import { FC, useState } from 'react';

// Constants
import { playlists } from '../../constants/cv';
import { SOCIAL_NETWORKS } from '../../constants/socialNetworks';

// Interfaces
import type { Playlist } from '../../interfaces/types';
import { PlaylistsSection } from './playlists';

interface HomeProps {
  playlists: Playlist[];
}

interface PlaylistListProps extends HomeProps {
  onSetColor: (color: string) => void;
}

const HorizontalPlaylists: FC<PlaylistListProps> = (props) => {
  return (
    <Row gutter={[16, 16]} style={{ margin: 10 }} justify='space-between'>
      {SOCIAL_NETWORKS.map((socialNetwork) => {
        return (
          <Col key={socialNetwork.name} xs={12} md={12} xl={6}>
            <PlaylistHorizontal socialNetwork={socialNetwork} />
          </Col>
        );
      })}
    </Row>
  );
};

const Playlists: FC<PlaylistListProps> = ({ playlists, onSetColor }) => {
  const { t } = useTranslation(['home']);

  return (
    <div className='home'>
      <PlaylistsSection title={`${t('Made for')} Franco Borrelli`} />
    </div>
  );
};

const Home = () => {
  const [color, setColor] = useState('rgb(66, 32, 35)');
  return (
    <div
      className='Home-seccion'
      style={{
        transition: 'background: 0.5s',
        background: `linear-gradient(180deg, ${color} -20%, rgb(18, 18, 18) 50%)`,
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <HorizontalPlaylists playlists={playlists} onSetColor={setColor} />
        </Col>
        <Col span={24}>
          <Playlists playlists={playlists} onSetColor={setColor} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
