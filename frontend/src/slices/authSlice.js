/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes/routes.js';

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (values) => {
    const response = await axios.post(apiRoutes.loginPath(), values);
    return response.data;    
  },
);

const isLoggedIn = () => !!localStorage.getItem('auth');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: isLoggedIn() ? JSON.parse(localStorage.getItem('auth')).token : '',
    username: isLoggedIn() ? JSON.parse(localStorage.getItem('auth')).username : '',
    loggedIn: isLoggedIn(),
    status: 'idle',
    error: null,
  },
  reducers: {
    logOut(state) {
      state.token = '';
      state.username = '';
      state.loggedIn = false;
      state.status = 'idle',
      state.error = null,
      localStorage.removeItem('auth');
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(logIn.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(logIn.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.error = null;

          const auth = action.payload;
          state.token = auth.token;
          state.username = auth.username;
          state.loggedIn = true;          
          localStorage.setItem('auth', JSON.stringify(auth));
        })
        .addCase(logIn.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    }, 
});

export default authSlice.reducer;
