import React from "react";

import "./playlistTable.css";

import Song from "../items/song";
import withSongsState from "../hoc/songHoc";
import EmptySection from "./components/emptySection/empty";
import InfiniteScroll from "react-infinite-scroller";

import ReactDragListView from "react-drag-listview";

const playlistTable = props => {
  const isMine = props.playlist && props.playlist.mine;

  const Draggable = isMine ? ReactDragListView : "div";

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      props.movePlaylistSong(props.playlist, fromIndex, toIndex);
    },
    nodeSelector: "li",
    handleSelector: "li",
    lineClassName: "draggingLine"
  };

  return props.songs.length === 0 ? (
    <EmptySection />
  ) : (
    <div className="playlist-table">
      <div className="song-header-container">
        <div style={{ width: 40 }} />
        <div style={{ width: 40 }} />
        <div className="song-title-header">
          <p>Title</p>
        </div>
        <div className="song-artist-header">
          <p>Artist</p>
        </div>
        <div className="song-album-header">
          <p>Album</p>
        </div>
        {props.removeDate ? null : (
          <div className="song-added-header">
            <i className="fa fa-calendar-plus-o" aria-hidden="true" />
          </div>
        )}
        <div className="song-length-header">
          <i className="fa fa-clock-o" aria-hidden="true" />
        </div>
      </div>
      <Draggable {...dragProps}>
        <InfiniteScroll
          pageStart={0}
          loadMore={props.fetchMoreSongs}
          hasMore={props.more}
          loader={<div className="loader" key={0} />}
        >
          {props.songs.map((item, i) => (
            <Song
              onAdd={() => {
                props.changeSongStatus(i, true);
                props.addSong(item.track ? item.track.id : item.id);
              }}
              onDelete={() => {
                props.changeSongStatus(i, false);
                props.removeSong(item.track ? item.track.id : item.id);
              }}
              removeDate={props.removeDate}
              added_at={item.track ? item.added_at : ""}
              contains={props.songsStatus[i]}
              item={item.track || item}
              key={item.track ? item.track.id + i : item.id + i}
              id={item.track ? item.track.id : item.id}
              uri={props.uri}
              offset={i}
              current={props.current}
              playing={props.playing}
              pauseSong={props.pauseSong}
              playSong={props.playSong}
            />
          ))}
        </InfiniteScroll>
      </Draggable>
    </div>
  );
};

export default withSongsState(playlistTable);
