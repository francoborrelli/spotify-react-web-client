import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withUiActions from '../../../../../hoc/uiChange';

import {
  fetchGenres,
  fetchNewReleases,
  fetchFeatured,
  fetchPlaylistForCategory
} from '../../../../../store/actions/browseActions';

import Album from '../items/album';
import Genre from '../items/genre';
import Playlist from '../items/playlist';

class Categories extends Component {
  componentDidMount() {
    this.props.fetchGenres();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.categories.length === 0 ||
      this.props.active !== prevProps.active
    ) {
      switch (this.props.active) {
        case 'New Releases':
          this.props.fetchNewReleases();
          break;
        case 'Featured':
          this.props.fetchFeatured();
          break;
        case 'Genres & Moods':
          this.props.fetchGenres();
          break;
      }
    }
  }

  renderCategories = () => {
    switch (this.props.active) {
      case 'New Releases':
        return this.props.categories.map(item => (
          <Album
            item={item}
            key={item.id}
            onClick={() => this.props.onAlbumClick(item.id)}
            onArtistClick={this.props.onArtistClick}
          />
        ));
      case 'Genres & Moods':
        return this.props.categories.map(item => (
          <Genre
            item={item}
            onClick={() => {
              this.props.fetchPlaylistForCategory(item.id);
              this.props.setActive(item.name);
            }}
            key={item.id}
          />
        ));
      default:
        return this.props.categories.map(item => (
          <Playlist
            item={item}
            key={item.id}
            onClick={() => this.props.onPlaylistClick(item.id)}
          />
        ));
    }
  };

  render = () => (
    <ul className="browse-container">{this.renderCategories()}</ul>
  );
}

const mapStateToProps = state => {
  return {
    categories: state.browseReducer.categories
      ? state.browseReducer.categories
      : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchGenres,
      fetchNewReleases,
      fetchFeatured,
      fetchPlaylistForCategory
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUiActions(Categories));
