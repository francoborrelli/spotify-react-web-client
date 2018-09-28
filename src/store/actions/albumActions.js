import axios from '../../axios';

const fetchAlbumSuccess = album => {
  return {
    type: 'FETCH_ALBUM_SUCCESS',
    album
  };
};

const fetchAlbumError = () => {
  return {
    type: 'FETCH_ALBUM_ERROR'
  };
};

const fetchAlbumPending = () => {
  return {
    type: 'FETCH_ALBUM_PENDING'
  };
};

export const fetchAlbum = id => {
  return async dispatch => {
    dispatch(fetchAlbumPending());
    function onSuccess(album) {
      dispatch(fetchAlbumSuccess(album));
      return album;
    }
    function onError(error) {
      dispatch(fetchAlbumError());
      return error;
    }
    try {
      const album = await axios.get(`/albums/${id}`);
      const tracks = await axios.get(`/albums/${id}/tracks?limit=50`);
      return onSuccess({ ...album.data, tracks: tracks.data.items });
    } catch (error) {
      return onError(error);
    }
  };
};
