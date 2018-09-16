export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SONGS_PENDING':
      return {
        fetchSongsPending: true,
        ...state
      };

    case 'FETCH_SONGS_SUCCESS':
      return {
        songs: action.songs.items,
        fetchSongsError: false,
        fetchSongsPending: false,
        ...state
      };

    case 'FETCH_SONGS_ERROR':
      return {
        fetchSongsError: true,
        fetchSongsPending: false,
        ...state
      };

    default:
      return state;
  }
};

export default playlistReducer;
