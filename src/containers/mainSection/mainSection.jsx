import React, { Component } from 'react';

import { connect } from 'react-redux';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

class MainSection extends Component {
  render = () => {
    let name = this.props.user.display_name;
    let id = this.props.user.id;
    let img = this.props.user.images ? this.props.user.images[0].url : '';

    return (
      <div className="main-section">
        <Header username={name || id} img={img} />
        <div className="main-section-container" />
        <Footer />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps)(MainSection);
