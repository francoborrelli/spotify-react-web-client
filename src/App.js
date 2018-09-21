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
    playerSelected: false,
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
      playerRefreshRateMs: 100,
      playerAutoConnect: true,
      onPlayerRequestAccessToken: () => this.state.token,
      onPlayerLoading: () => this.setState({ playerLoaded: true }),
      onPlayerWaitingForDevice: data =>
        this.setState({ playerSelected: false, userDeviceId: data.device_id }),
      onPlayerDeviceSelected: () => this.setState({ playerSelected: true }),
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
  fetchUser: token => dispatch(fetchUser(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
