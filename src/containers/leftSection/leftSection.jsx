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
      <TrackCover src="https://upload.wikimedia.org/wikipedia/en/1/1d/5_-_box_set_by_Ed_Sheeran.jpg" />
    </div>
  </div>
);

export default leftSection;
