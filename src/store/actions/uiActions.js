export const setView = view => {
  return {
    type: 'SET_NEW_VIEW',
    view
  };
};

export const setModal = (modal, mode = 'new') => {
  return {
    type: 'SET_MODAL',
    modal,
    mode
  };
};
