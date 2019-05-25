import axios from "../../axios";

const fetchPlaylistMenuPending = () => {
  return {
    type: "FETCH_PLAYLIST_MENU_PENDING"
  };
};

const fetchPlaylistMenuSuccess = playlists => {
  return {
    type: "FETCH_PLAYLIST_MENU_SUCCESS",
    playlists
  };
};

const fetchPlaylistMenuError = () => {
  return {
    type: "FETCH_PLAYLIST_MENU_ERROR"
  };
};

export const movePlaylist = (snapshot_id, from, to) => {
  return {
    type: "SORT_SONG",
    snapshot_id,
    from,
    to
  };
};

export const movePlaylistSong = (playlist, range_start, insert_before) => {
  return async dispatch => {
    try {
      const data = {
        range_start,
        insert_before: insert_before === 0 ? insert_before : insert_before + 1,
        snapshot_id: playlist.snapshot_id
      };
      const response = await axios.put(
        `/playlists/${playlist.id}/tracks`,
        data
      );
      dispatch(
        movePlaylist(response.data.snapshot_id, range_start, insert_before)
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };
};

export const fetchPlaylistsMenu = () => {
  return async dispatch => {
    dispatch(fetchPlaylistMenuPending());
    try {
      const response = await axios.get("/me/playlists");
      dispatch(fetchPlaylistMenuSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchPlaylistMenuError());

      return error;
    }
  };
};

const fetchPlaylistPending = () => {
  return {
    type: "FETCH_PLAYLIST_PENDING"
  };
};

const fetchPlaylistSuccess = playlist => {
  return {
    type: "FETCH_PLAYLIST_SUCCESS",
    playlist
  };
};

const fetchPlaylistError = () => {
  return {
    type: "FETCH_PLAYLIST_ERROR"
  };
};

export const updatePlaylist = playlist => {
  return {
    type: "UPDATE_PLAYLIST",
    playlist
  };
};

const fetchMoreSuccess = (songs, next) => {
  return {
    type: "FETCH_MORE_SUCCESS",
    songs,
    next
  };
};

const dispacher = a => {
  return a;
};

export const followPlaylist = () => {
  return async (dispatch, getState) => {
    const id = getState().playlistReducer.playlist.id;
    axios.put(`/playlists/${id}/followers`);
    dispatch(
      dispacher({
        type: "FOLLOW_PLAYLIST"
      })
    );
  };
};

export const unfollowPlaylist = () => {
  return async (dispatch, getState) => {
    const id = getState().playlistReducer.playlist.id;
    axios.delete(`/playlists/${id}/followers`);
    dispatch(
      dispacher({
        type: "UNFOLLOW_PLAYLIST"
      })
    );
  };
};

export const fetchMoreSongs = () => {
  return async (dispatch, getState) => {
    try {
      const next = getState().playlistReducer.playlist.tracks.next;
      if (next) {
        const response = await axios.get(next);
        dispatch(fetchMoreSuccess(response.data.items, response.data.next));
        return response;
      }
    } catch (error) {
      return error;
    }
  };
};

export const fetchPlaylist = id => {
  return async (dispatch, getState) => {
    dispatch(fetchPlaylistPending());

    function onSuccess(playlist) {
      dispatch(fetchPlaylistSuccess(playlist));
      return playlist;
    }
    try {
      const userId = getState().userReducer.user.id;
      const playlist = await axios.get(`/playlists/${id}`);
      const follows = await axios.get(
        `/playlists/${id}/followers/contains?ids=${userId}`
      );
      return onSuccess({
        ...playlist.data,
        follows: follows.data[0],
        mine: userId === playlist.data.owner.id
      });
    } catch (error) {
      dispatch(fetchPlaylistError());
      return error;
    }
  };
};
