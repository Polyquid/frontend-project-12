import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: localStorage.getItem('username') ?? '',
  token: localStorage.getItem('token') ?? '',
};

const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    setAuthData: (state, { payload: authData }) => authData,
    resetAuthData: () => ({ username: '', token: '' }),
  },
});

export const { setAuthData, resetAuthData } = authDataSlice.actions;
export default authDataSlice.reducer;
