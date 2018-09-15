import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCategories } from '../../store/actions/browseActions';

import './browse.css';

class Browse extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.token !== '' && this.props.categories.length == 0) {
      this.props.fetchCategories(this.props.token);
    }
  }

  renderElements = () =>
    this.props.categories.map((item, i) => (
      <li className="category-item" key={i}>
        <div className="category-image">
          <img src={item.icons ? item.icons[0].url : item.images[0].url} />
          <p className="category-name">{item.name}</p>
        </div>
      </li>
    ));

  render = () => <ul className="browse-container">{this.renderElements()}</ul>;
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
      fetchCategories
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
