export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SONGS_PENDING':
      return {
        ...state,
        fetchSongsPending: true
      };

    case 'FETCH_SONGS_SUCCESS':
      return {
        ...state,
        songs: action.songs,
        fetchSongsError: false,
        fetchSongsPending: false
      };

    case 'FETCH_SONGS_ERROR':
      return {
        ...state,
        fetchSongsError: true,
        fetchSongsPending: false
      };

    case 'FETCH_MORE_SONGS_SUCCESS':
      let items = [...state.songs.items, ...action.songs];
      return {
        ...state,
        songs: {
          ...state.songs,
          next: action.next,
          items: items
        }
      };
    case 'CONTAINS_CURRENT_SUCCESS':
      return {
        ...state,
        containsCurrent: action.contains.data.includes(true)
      };
    case 'REMOVE_SONG_SUCCESS':
      return {
        ...state,
        containsCurrent: action.current ? false : state.containsCurrent
      };
    case 'ADD_SONG_SUCCESS':
      return {
        ...state,
        containsCurrent: action.current ? true : state.containsCurrent
      };
    default:
      return state;
  }
};

export default playlistReducer;
