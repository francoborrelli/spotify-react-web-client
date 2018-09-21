import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPlaylistsMenu } from '../../store/actions/playlistActions';

import './siderMenu.css';

import withUiActions from '../../hoc/uiHoc';
import MenuItem from './components/menuItem';

const sectionOne = [{ name: 'Browse', view: 'browse' }, { name: 'Radio' }];

const sectionTwo = [
  { name: 'Your Daily Mix' },
  { name: 'Recently Played', view: 'recently' },
  { name: 'Songs', view: 'songs' },
  { name: 'Albums' },
  { name: 'Artists' },
  { name: 'Stations' },
  { name: 'Local Files' },
  { name: 'Videos' },
  { name: 'Postcasts' }
];

class SiderMenu extends Component {
  state = {
    active: 'Browse'
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.token !== '') {
      this.props.fetchPlaylistsMenu(nextProps.token);
    }
  }

  setActive = (item, playlist) => {
    this.setState({ active: item.name });
    if (playlist) {
      this.props.onPlaylistClick(item.id);
    } else {
      this.props.setView(item.view || 'browse');
    }
  };

  generateItems(items, playlist = false) {
    return items.map(item => (
      <MenuItem
        key={item.name}
        title={item.name}
        active={this.state.active === item.name}
        onClick={() => this.setActive(item, playlist)}
      />
    ));
  }

  render = () => {
    const playlists = this.props.playlists ? this.props.playlists.items : [];
    return (
      <ul className="side-menu-container">
        {this.generateItems(sectionOne)}
        <h3 className="library-header">Your Library</h3>
        {this.generateItems(sectionTwo)}
        <div className="user-playlist-container">
          <h3 className="library-header">Playlists</h3>
          {this.generateItems(playlists, true)}
        </div>
      </ul>
    );
  };
}

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token || null,
    playlists: state.playlistReducer.playlists || null
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPlaylistsMenu }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUiActions(SiderMenu));
