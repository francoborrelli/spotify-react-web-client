export const albumReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ALBUM_SUCCESS':
      return {
        ...state,
        currentAlbum: action.album,
        fetchAlbumError: false
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
