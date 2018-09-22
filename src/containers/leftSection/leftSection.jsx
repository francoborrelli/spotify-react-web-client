import React from 'react';

import SiderMenu from '../../components/siderMenu/siderMenu';
import TrackCover from '../../components/trackCover/trackCover';
import NewPlaylist from './components/newplaylist';

import './leftSection.css';

const leftSection = props => (
  <div className="left-section">
    <SiderMenu />
    <div className="buttom-section">
      <NewPlaylist />
      <TrackCover />
    </div>
  </div>
);

export default leftSection;
