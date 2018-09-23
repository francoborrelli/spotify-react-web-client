export const albumReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ALBUM_SUCCESS':
      return {
        ...state,
        currentAlbum: action.album,
        fetchAlbumError: false,
        fetchAlbumPending: false
      };
    case 'FETCH_ALBUM_PENDING':
      return {
        ...state,
        fetchAlbumPending: true
      };

    case 'FETCH_ALBUM_ERROR':
      return {
        ...state,
        fetchAlbumError: true
      };

    default:
      return state;
  }
};

export default albumReducer;
