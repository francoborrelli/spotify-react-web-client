import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Languages } from '../../interfaces/languages';

const initialState: { language: Languages; isModalOpen: boolean } = {
  language: 'en',
  isModalOpen: false,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<{ language: Languages }>) {
      state.language = action.payload.language;
    },
    openLanguageModal(state) {
      state.isModalOpen = true;
    },
    closeLanguageModal(state, action: PayloadAction<{ language?: Languages }>) {
      state.isModalOpen = false;
      if (action.payload.language) {
        state.language = action.payload.language;
      }
    },
  },
});

export const languageActions = languageSlice.actions;

export default languageSlice.reducer;
