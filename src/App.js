import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setToken } from './store/actions/tokenAction';
import { fetchUser } from './store/actions/userActions';

import './App.css';

import LeftSection from './containers/leftSection/leftSection';
import MainSection from './containers/mainSection/mainSection';
import Footer from './components/footer/footer';

var client_id = '877a83359117400a962e4bf9c0480c39';
var redirect_uri = 'http://localhost:3001/callback';
var scope = 'user-read-private user-read-email playlist-read-private';

class App extends Component {
  componentDidMount() {
    let hashParams = this.getHashParams();

    if (!hashParams.access_token) {
      this.requestToken();
    } else {
      this.props.setToken(hashParams.access_token);
      this.props.fetchUser(hashParams.access_token);
      window.location.hash = '';
    }
  }
  requestToken() {
    window.location.href =
      'https://accounts.spotify.com/authorize?client_id=' +
      client_id +
      '&scope=' +
      scope +
      '&response_type=token&redirect_uri=' +
      redirect_uri;
  }

  getHashParams() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="app">
        <LeftSection />
        <MainSection />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token
  };
};

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(setToken(token)),
  fetchUser: token => dispatch(fetchUser(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
