import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withUiActions from '../../../../../hoc/uiChange';

import {
  fetchGenres,
  fetchNewReleases,
  fetchFeatured
} from '../../../../../store/actions/browseActions';

import Album from '../items/album';
import Genre from '../items/genre';
import Playlist from '../items/playlist';

class Categories extends Component {
  componentDidMount() {
    const token = this.props.token;
    if (token) {
      this.props.fetchGenres(token);
    }
  }

  componentDidUpdate(prevProps) {
    const token = this.props.token;

    if (
      token !== '' &&
      (prevProps.categories.length === 0 ||
        this.props.active !== prevProps.active)
    ) {
      switch (this.props.active) {
        case 'New Releases':
          this.props.fetchNewReleases(token);
          break;
        case 'Featured':
          this.props.fetchFeatured(token);
          break;
        case 'Genres & Moods':
          this.props.fetchGenres(token);
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
            key={item.name}
            onArtistClick={this.props.onArtistClick}
          />
        ));
      case 'Featured':
        return this.props.categories.map(item => (
          <Playlist
            item={item}
            key={item.name}
            onClick={() => this.props.onPlaylistClick(item.id)}
          />
        ));
      default:
        return this.props.categories.map(item => (
          <Genre item={item} key={item.name} />
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
      fetchFeatured
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUiActions(Categories));
