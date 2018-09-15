import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPlaylistsMenu } from '../../store/actions/playlistActions';

import './siderMenu.css';

import MenuItem from './components/menuItem';

const sectionOne = [{ name: 'Browse' }, { name: 'Radio' }];

const sectionTwo = [
  { name: 'Your Daily Mix' },
  { name: 'Recently Played' },
  { name: 'Songs' },
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

  setActive(name) {
    this.setState({ active: name });
  }

  generateItems = items =>
    items.map(item => (
      <MenuItem
        key={item.name}
        title={item.name}
        active={this.state.active === item.name}
        onClick={() => this.setActive(item.name)}
      />
    ));

  render = () => {
    const playlists = this.props.playlists ? this.props.playlists.items : [];

    return (
      <ul className="side-menu-container">
        {this.generateItems(sectionOne)}
        <h3 className="library-header">Your Library</h3>
        {this.generateItems(sectionTwo)}
        <div className="user-playlist-container">
          <h3 className="library-header">Playlists</h3>
          {this.generateItems(playlists)}
        </div>
      </ul>
    );
  };
}

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : '',
    playlists: state.playlistReducer.playlistMenu
      ? state.playlistReducer.playlistMenu
      : null
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPlaylistsMenu
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderMenu);
