import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import { setToken } from './store/actions/sessionActions';
import { fetchUser } from './store/actions/userActions';

import LeftSection from './containers/leftSection/leftSection';
import MainSection from './containers/mainSection/mainSection';

import Login from './spotify/login';
import WebPlaybackReact from './spotify/webPlayback';

window.onSpotifyWebPlaybackSDKReady = () => {};

class App extends Component {
  state = {
    playerLoaded: false,
    playerState: null
  };

  componentDidMount() {
    const token = Login.getToken();
    if (!token) {
      Login.logInWithSpotify();
    } else {
      this.setState({ token: token });
      this.props.setToken(token);
      this.props.fetchUser();
    }
  }

  render() {
    let webPlaybackSdkProps = {
      playerName: 'Spotify React Player',
      playerInitialVolume: 1.0,
      playerRefreshRateMs: 10000,
      playerAutoConnect: true,
      onPlayerRequestAccessToken: () => this.state.token,
      onPlayerLoading: () => {},
      onPlayerWaitingForDevice: () => {},
      onPlayerStateChange: playerState => console.log(playerState),
      onPlayerError: playerError => console.error(playerError)
    };

    return (
      <div className="app">
        <WebPlaybackReact {...webPlaybackSdkProps}>
          <LeftSection />
          <MainSection />
        </WebPlaybackReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.sessionReducer.token
  };
};

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(setToken(token)),
  fetchUser: () => dispatch(fetchUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
