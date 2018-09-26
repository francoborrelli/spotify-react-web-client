import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPlaylistsMenu } from '../../store/actions/playlistActions';

import './siderMenu.css';

import withUiActions from '../../hoc/uiHoc';
import MenuItem from './components/menuItem';

const sectionOne = [{ name: 'Browse', view: 'browse', id: 1 }];

const sectionTwo = [
  { name: 'Recently Played', view: 'recently', id: 2 },
  { name: 'Songs', view: 'songs', id: 3 },
  { name: 'Albums', view: 'albums', id: 4 },
  { name: 'Artists', view: 'artists', id: 5 }
];

class SiderMenu extends Component {
  state = {
    active: 'Browse'
  };

  componentDidMount() {
    this.props.fetchPlaylistsMenu();
  }

  setActive = (item, playlist) => {
    this.setState({ active: item.id });
    if (playlist) {
      this.props.onPlaylistClick(item.id);
    } else {
      this.props.setView(item.view || 'browse');
    }
  };

  generateItems(items, playlist = false) {
    return items.map(item => (
      <MenuItem
        key={item.id}
        title={item.name}
        active={this.state.active === item.id}
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
