import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchGenres,
  fetchNewReleases,
  fetchFeatured
} from '../../store/actions/browseActions';

class Categories extends Component {
  componentDidUpdate(prevProps) {
    const token = this.props.token;

    if (token !== '' && prevProps.active !== this.props.active) {
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
    let genre = this.props.active === 'Genres & Moods';

    return this.props.categories.map((item, i) => (
      <li className="category-item" key={i}>
        <div className={'category-image' + (genre ? '' : ' playlist')}>
          <img src={item.icons ? item.icons[0].url : item.images[0].url} />
          {genre ? <p className="category-name">{item.name}</p> : ''}
        </div>
      </li>
    ));
  };

  render = () => (
    <ul className="browse-container">{this.renderCategories()}</ul>
  );
}

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : '',
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
)(Categories);
