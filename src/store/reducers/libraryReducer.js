export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SONGS_PENDING':
      return {
        ...state,
        fetchSongsPending: true
      };

    case 'FETCH_SONGS_SUCCESS':
      return {
        ...state,
        songs: action.songs.items,
        fetchSongsError: false,
        fetchSongsPending: false
      };

    case 'FETCH_SONGS_ERROR':
      return {
        ...state,
        fetchSongsError: true,
        fetchSongsPending: false
      };

    default:
      return state;
  }
};

export default playlistReducer;
