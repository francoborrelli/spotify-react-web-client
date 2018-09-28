import React from 'react';
import moment from 'moment';

import withUiActions from '../../../hoc/uiHoc';

const msToMinutesAndSeconds = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

const song = props => {
  const active = props.id === props.current && props.playing;
  const buttonClass = active ? 'fa-pause-circle-o' : 'fa-play-circle-o';

  const artists = props.item.artists ? props.item.artists.length : 0;

  const event = active
    ? props.pauseSong
    : () => props.playSong(props.uri, props.offset);

  return (
    <tr className={'user-song-item' + (active ? ' active' : '')}>
      {props.isAlbum ? (
        <td className="r-song" onClick={event}>
          <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
          {active ? (
            <i className="fa fa-volume-up playing" />
          ) : (
            <span>{props.index}</span>
          )}
        </td>
      ) : (
        <td className="play-song" onClick={event}>
          <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
          {active ? <i className="fa fa-volume-up" /> : null}
        </td>
      )}
      <td className="add-remove-section">
        {props.contains ? (
          <i
            className="fa fa-check"
            aria-hidden="true"
            onClick={props.onDelete}
          />
        ) : (
          <i className="fa fa-plus" aria-hidden="true" onClick={props.onAdd} />
        )}
      </td>
      <td className="song-title">
        <p>{props.item.name}</p>
      </td>
      <td className="song-artist">
        <p>
          {props.item.artists
            ? props.item.artists.map((a, i) => (
                <span key={i}>
                  <span
                    className="artist"
                    onClick={() => props.onArtistClick(a.id)}
                  >
                    {a.name}
                  </span>
                  {artists !== i + 1 ? <span>, </span> : null}
                </span>
              ))
            : ''}
        </p>
      </td>
      {!props.isAlbum && (
        <td className="song-album">
          <p
            className="album"
            onClick={() => props.onAlbumClick(props.item.album.id)}
          >
            {props.item.album.name}
          </p>
        </td>
      )}
      {!props.isAlbum &&
        !props.removeDate && (
          <td className="song-added">
            <p>{moment(props.added_at).format('YYYY-MM-DD')}</p>
          </td>
        )}
      {props.isAlbum && (
        <td className="song-explicit">
          {props.item.explicit ? <p className="explicit">EXPLICIT</p> : null}
        </td>
      )}
      <td className="song-length">
        <p>{msToMinutesAndSeconds(props.item.duration_ms)}</p>
      </td>
    </tr>
  );
};

export default withUiActions(song);
