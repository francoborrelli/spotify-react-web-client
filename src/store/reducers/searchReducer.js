export const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,

        artists: action.data.artists.items,
        playlists: action.data.playlists.items,
        tracks: action.data.tracks.items,
        albums: action.data.albums.items,
        fetchDataPending: false
      };
    case 'FETCH_DATA_PENDING':
      return {
        ...state,
        fetchDataPending: true
      };
    case 'SET_QUERY':
      return {
        ...state,
        query: action.query
      };
    default:
      return state;
  }
};

export default searchReducer;
