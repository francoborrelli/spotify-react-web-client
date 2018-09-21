import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setToken } from './store/actions/tokenAction';
import { fetchUser } from './store/actions/userActions';

import './App.css';

import LeftSection from './containers/leftSection/leftSection';
import MainSection from './containers/mainSection/mainSection';

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_ID;
const scope =
  'user-read-private user-read-email playlist-read-private user-read-recently-played user-modify-playback-state user-read-playback-state user-follow-modify';

class App extends Component {
  componentDidMount() {
    let hashParams = this.getHashParams();

    if (!hashParams.access_token) {
      this.requestToken();
    } else {
      this.props.setToken(hashParams.access_token);
      this.props.fetchUser();
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
