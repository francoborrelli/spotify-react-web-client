import React, { Component } from 'react';

import { connect } from 'react-redux';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import Browse from '../../components/browse/browser';
import Songs from '../../components/songList/songList';

import defaultProfile from './images/profile.png';
import './mainSection.css';

class MainSection extends Component {
  render = () => {
    let name = this.props.user.display_name;
    let id = this.props.user.id;
    let img = this.props.user.images
      ? this.props.user.images[0].url
      : defaultProfile;

    return (
      <div className="main-section">
        <Header username={name || id} img={img} />
        <div className="main-section-container">
          {this.props.view === 'browse' ? <Browse /> : <Songs />}
        </div>
        <Footer />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    view: state.uiReducer.view
  };
};

export default connect(mapStateToProps)(MainSection);
