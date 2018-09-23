import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setModal } from '../../store/actions/uiActions';

import SiderMenu from '../../components/siderMenu/siderMenu';
import TrackCover from '../../components/trackCover/trackCover';
import NewPlaylist from './components/newplaylist';

import './leftSection.css';

class LeftSection extends Component {
  render() {
    return (
      <div className="left-section">
        <SiderMenu />
        <div className="buttom-section">
          <NewPlaylist setModal={this.props.setModal} />
          <TrackCover />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setModal
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(LeftSection);
