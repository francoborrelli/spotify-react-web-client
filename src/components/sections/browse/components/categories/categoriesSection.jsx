import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withUiActions from '../../../../../hoc/uiHoc';

import {
  fetchGenres,
  fetchNewReleases,
  fetchFeatured,
  fetchCharts,
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
        case 'Charts':
          this.props.fetchCharts();
          break;
        default:
          this.props.fetchGenres();
          break;
      }
    }
  }

  renderCategories = () => {
    let categories = this.props.categories;
    switch (this.props.active) {
      case 'New Releases':
        return categories.map(item => (
          <Album
            item={item}
            key={item.id}
            onClick={() => this.props.onAlbumClick(item.id)}
            onArtistClick={this.props.onArtistClick}
          />
        ));
      case 'Genres & Moods':
        return categories.map(item => (
          <Genre
            item={item}
            onClick={() => {
              this.props.fetchPlaylistForCategory(item.id);
              this.props.setActive(item.name);
            }}
            key={item.id}
          />
        ));
      case 'Charts':
        const charts = categories.filter(c => c.name.includes('50'));
        categories = categories.filter(c => !c.name.includes('50'));
        return (
          <Fragment>
            {charts.map(item => (
              <Playlist
                chart
                item={item}
                key={item.id}
                onClick={() => this.props.onPlaylistClick(item.id)}
              />
            ))}
            <div className="toplists">
              <h3 className="browse-title"> Top Lists</h3>
            </div>
            {categories.map(item => (
              <Playlist
                item={item}
                key={item.id}
                onClick={() => this.props.onPlaylistClick(item.id)}
              />
            ))}
          </Fragment>
        );
      default:
        return categories.map(item => (
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
      fetchCharts,
      fetchPlaylistForCategory
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUiActions(Categories));
