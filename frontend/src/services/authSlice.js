import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  username: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, { payload: { token } }) => ({ ...state, token }),
    setUserName: (state, { payload: { username } }) => ({ ...state, username }),
  },
});

export const { setAuthToken, setUserName } = authSlice.actions;
export default authSlice.reducer;
