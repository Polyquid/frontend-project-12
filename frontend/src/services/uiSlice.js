import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  defaultChannel: {
    name: 'general',
    id: '1',
  },
  currentChannel: {
    name: undefined,
    id: null,
  },
  currentModal: {
    name: undefined,
    show: false,
  },
  clickedChannel: {
    name: undefined,
    id: null,
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
