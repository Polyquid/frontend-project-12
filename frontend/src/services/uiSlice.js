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
    setCurrentModal: (state, { payload: currentModal }) => ({ ...state, currentModal }),
    setClickedChannel: (state, { payload: clickedChannel }) => ({ ...state, clickedChannel }),
  },
});

export const {
  setCurrentChannel,
  setCurrentModal,
  setClickedChannel,
} = uiSlice.actions;
export default uiSlice.reducer;
