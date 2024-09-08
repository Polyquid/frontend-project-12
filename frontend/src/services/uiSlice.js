import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: {
    name: 'general',
    id: '1',
  },
  currentModal: {
    name: '',
    show: false,
  },
  clickedChannel: {
    id: null,
    name: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload: currentChannel }) => ({ ...state, currentChannel }),
    setCurrentModalName: (state, { payload: { name } }) => {
      const newCurrentModal = { ...state.currentModal, name };
      return { ...state, currentModal: newCurrentModal };
    },
    setCurrentModalShow: (state, { payload: { show } }) => {
      const newCurrentModal = { ...state.currentModal, show };
      return { ...state, currentModal: newCurrentModal };
    },
    setClickedChannel: (state, { payload: clickedChannel }) => ({ ...state, clickedChannel }),
  },
});

export const {
  setCurrentChannel,
  setCurrentModalName,
  setCurrentModalShow,
  setClickedChannel,
} = uiSlice.actions;
export default uiSlice.reducer;
