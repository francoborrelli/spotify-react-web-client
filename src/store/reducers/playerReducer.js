export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SONG_SUCCESS':
      return {
        ...state,
        currentSong: action.song,
        fetchSongError: false
      };

    case 'FETCH_SONG_ERROR':
      return {
        ...state,
        fetchSongError: true
      };
    case 'PAUSE_STATE':
      return {
        ...state,
        playing: false
      };

    default:
      return state;
  }
};

export default playerReducer;
