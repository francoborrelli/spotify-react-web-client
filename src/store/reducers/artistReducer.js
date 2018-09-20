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
        ...state,
        fetchArtistError: true,
        fetchArtistPending: false
      };

    case 'FOLLOW_ARTIST':
      return {
        ...state,
        currentArtist: { ...state.currentArtist, follows: true }
      };

    case 'UNFOLLOW_ARTIST':
      return {
        ...state,
        currentArtist: { ...state.currentArtist, follows: false }
      };

    default:
      return state;
  }
};

export default playlistReducer;
