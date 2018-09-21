export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PLAYLIST_MENU_PENDING':
      return {
        ...state,
        fetchPlaylistsPending: true
      };

    case 'FETCH_PLAYLIST_MENU_SUCCESS':
      return {
        playlists: action.playlists,
        fetchPlaylistsError: false,
        fetchPlaylistsPending: false,
        ...state
      };

    case 'FETCH_PLAYLIST_MENU_ERROR':
      return {
        ...state,
        fetchPlaylistsError: true,
        fetchPlaylistsPending: false
      };
    case 'FETCH_PLAYLIST_PENDING':
      return {
        ...state,
        fetchPlaylistPending: true
      };

    case 'FETCH_PLAYLIST_SUCCESS':
      return {
        ...state,
        playlist: action.playlist,
        fetchPlaylistError: false,
        fetchPlaylistPending: false
      };

    case 'FETCH_PLAYLIST_ERROR':
      return {
        ...state,
        fetchPlaylistError: true,
        fetchPlaylistPending: false
      };

    case 'FOLLOW_PLAYLIST':
      let array = state.playlists.items;
      array.unshift({ id: state.playlist.id, name: state.playlist.name });
      return {
        ...state,
        playlist: { ...state.playlist, follows: true },
        playlists: {
          ...state.playlists,
          total: state.playlists.total + 1,
          items: array
        }
      };

    case 'UNFOLLOW_PLAYLIST':
      array = state.playlists.items.filter(i => i.id !== state.playlist.id);
      return {
        ...state,
        playlist: { ...state.playlist, follows: false },
        playlists: {
          ...state.playlists,
          total: state.playlists.total - 1,
          items: array
        }
      };

    default:
      return state;
  }
};

export default playlistReducer;
