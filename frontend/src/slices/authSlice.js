/* eslint-disable no-param-reassign */

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { api } from '../services/api.js';

const isLoggedIn = () => !!localStorage.getItem('auth');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: isLoggedIn() ? JSON.parse(localStorage.getItem('auth')).token : '',
    username: isLoggedIn() ? JSON.parse(localStorage.getItem('auth')).username : '',
    loggedIn: isLoggedIn(),
  },
  reducers: {
    removeLocalAuth(state) {
      state.token = '';
      state.username = '';
      state.loggedIn = false;
      localStorage.removeItem('auth');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(api.endpoints.logIn.matchFulfilled, api.endpoints.signUp.matchFulfilled),
        (state, action) => {
          const { token, username } = action.payload;
          state.token = token;
          state.username = username;
          state.loggedIn = true;
          localStorage.setItem('auth', JSON.stringify(action.payload));
        },
      );
  },
});

export const { removeLocalAuth } = authSlice.actions;
export default authSlice.reducer;
