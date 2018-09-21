export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_STATUS_SUCCESS':
      return {
        ...state,
        status: action.status
      };
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
        status: { ...state.status, is_playing: false }
      };
    case 'PLAY_STATE':
      return {
        ...state,
        status: { ...state.status, is_playing: true }
      };

    default:
      return state;
  }
};

export default playerReducer;
