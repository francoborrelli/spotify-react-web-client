import axios from '../../axios';

export const fetchArtistPending = () => {
  return {
    type: 'FETCH_ARTIST_PENDING'
  };
};

export const fetchArtistSuccess = artist => {
  return {
    type: 'FETCH_ARTIST_SUCCESS',
    artist
  };
};

export const fetchArtistError = () => {
  return {
    type: 'FETCH_ARTIST_ERROR'
  };
};

export const followArtist = id => {
  axios.put(`/me/following?type=artist&ids=${id}`);
  return {
    type: 'FOLLOW_ARTIST'
  };
};

export const unfollowArtist = id => {
  axios.delete(`/me/following?type=artist&ids=${id}`);
  return {
    type: 'UNFOLLOW_ARTIST'
  };
};

export const fetchArtist = id => {
  return async (dispatch, getState) => {
    dispatch(fetchArtistPending());

    function onSuccess(artist) {
      dispatch(fetchArtistSuccess(artist));
      return artist;
    }
    function onError(error) {
      dispatch(fetchArtistError());
      return error;
    }
    try {
      const country = getState().userReducer.user.country;
      const follow = await axios.get(
        `/me/following/contains?type=artist&ids=${id}`
      );
      const artist = await axios.get(`/artists/${id}`);
      const popular = await axios.get(
        `/artists/${id}/top-tracks?country=${country}`
      );
      const albums = await axios.get(`/artists/${id}/albums`);
      return onSuccess({
        ...artist.data,
        popularTracks: popular.data.tracks,
        follows: follow.data[0],
        albums: albums.data.items.filter(i => i.album_type === 'album'),
        singles: albums.data.items.filter(i => i.album_type === 'single')
      });
    } catch (error) {
      return onError(error);
    }
  };
};
