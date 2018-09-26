import React from 'react';

import './playlistTable.css';

import Song from '../items/song';
import withSongsState from '../hoc/songHoc';
import EmptySection from './components/emptySection/empty';
import InfiniteScroll from 'react-infinite-scroller';

const playlistTable = props => {
  return props.songs.length === 0 ? (
    <EmptySection />
  ) : (
    <div>
      <div className="song-header-container">
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
              props.addSong(item.track.id);
            }}
            onDelete={() => {
              props.changeSongStatus(i, false);
              props.removeSong(item.track.id);
            }}
            removeDate={props.removeDate}
            added_at={item.track ? item.added_at : ''}
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
    </div>
  );
};

export default withSongsState(playlistTable);
