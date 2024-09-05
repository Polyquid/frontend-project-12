import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: {
    name: 'general',
    id: '1',
  },
  currentMessages: [],
  currentModal: '',
};

const uiSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload: currentChannel }) => ({ ...state, currentChannel }),
    setCurrentModal: (state, { payload: { currentModal } }) => ({ ...state, currentModal }),
  },
});

export const {
  setCurrentChannel,
  setCurrentModal,
} = uiSlice.actions;
export default uiSlice.reducer;
