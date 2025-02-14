/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes/routes.js';

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (token) => {
    const response = await axios.get(apiRoutes.channelsPath(), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
);
export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (task) => {
    const { data } = await axios.post(routes.tasksPath(), task);
    return data;
  },
);
export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async (task) => {
    const { data } = await axios.post(routes.tasksPath(), task);
    return data;
  },
);
export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    await axios.delete(routes.taskPath(id));
    return id;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ids: [],
    entities: {},
    currentChannelId: '1',
  },
  reducers: {
    changeChannel(state, action) {
      const { id } = action.payload;
      state.currentChannelId= id;
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.fulfilled, (state, action) => {
        const channels = action.payload;
        channels.forEach((channel) => {
          state.entities[channel.id] = channel;
          state.ids.push(channel.id);
        });
      })      
      .addCase(addChannel.fulfilled, (state, action) => {
        const channel = action.payload;
        state.entities[channel.id] = channel;
        state.ids.push(channel.id);
      })
      .addCase(editChannel.fulfilled, (state, action) => {
        const id = action.payload;
        state.currentChannelId= id;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        const id = action.payload;
        // удалить канал
      })
      .addCase(getChannels.rejected, (state, action) => (console.log(action.error)));
  },  
});

export const { changeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
