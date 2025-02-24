/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const isLoggedIn = () => !!localStorage.getItem('auth');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: isLoggedIn() ? JSON.parse(localStorage.getItem('auth')).token : '',
    username: isLoggedIn() ? JSON.parse(localStorage.getItem('auth')).username : '',
    loggedIn: isLoggedIn(),
  },
  reducers: {
    setLocalAuth(state, action) {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      state.loggedIn = true;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    removeLocalAuth(state) {
      state.token = '';
      state.username = '';
      state.loggedIn = false;
      localStorage.removeItem('auth');
    },
  },
});

export const { setLocalAuth, removeLocalAuth } = authSlice.actions;
export default authSlice.reducer;
