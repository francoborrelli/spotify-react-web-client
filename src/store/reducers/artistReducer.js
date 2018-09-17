export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ARTIST_PENDING':
      return {
        ...state,
        fetchArtistPending: true
      };

    case 'FETCH_ARTIST_SUCCESS':
      return {
        ...state,
        currentArtist: action.artist,
        fetchArtistError: false,
        fetchArtistPending: false
      };

    case 'FETCH_ARTIST_ERROR':
      return {
        fetchArtistError: true,
        fetchArtistPending: false,
        ...state
      };

    default:
      return state;
  }
};

export default playlistReducer;
