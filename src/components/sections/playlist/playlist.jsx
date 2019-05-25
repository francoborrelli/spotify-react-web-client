import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  fetchMoreSongs,
  movePlaylistSong
} from "../../../store/actions/playlistActions";

import Header from "./components/header/playlistHeader";
import Table from "../../songsTable/playlistTable/playlistTable";

import withStatus from "../../../hoc/statusHoc";
import Spinner from "../../spinner/spinner";

class Playlist extends Component {
  render = () => {
    return (
      <Spinner section loading={this.props.fetching}>
        <div className="player-container">
          <Header
            empty={
              this.props.playlist && this.props.playlist.tracks.items.length
                ? false
                : true
            }
            playlist={this.props.playlist || {}}
            currentUri={this.props.currentUri}
            playing={this.props.playing}
            pauseSong={this.props.pauseSong}
            playSong={() => this.props.playSong(this.props.playlist.uri, 0)}
          />
          <Table
            more={
              this.props.playlist && this.props.playlist.tracks.next
                ? true
                : false
            }
            playlist={this.props.playlist || {}}
            fetchMoreSongs={this.props.fetchMoreSongs}
            movePlaylistSong={this.props.movePlaylistSong}
            current={this.props.currentSong}
            playing={this.props.playing}
            uri={this.props.playlist ? this.props.playlist.uri : ""}
            songs={this.props.playlist ? this.props.playlist.tracks.items : []}
            pauseSong={this.props.pauseSong}
            playSong={this.props.playSong}
          />
        </div>
      </Spinner>
    );
  };
}
const mapStateToProps = state => {
  return {
    playlist: state.playlistReducer.playlist
      ? state.playlistReducer.playlist
      : null,
    fetching: state.playlistReducer.fetchPlaylistPending
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchMoreSongs,
      movePlaylistSong
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStatus(Playlist));
