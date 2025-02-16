/* eslint-disable no-param-reassign */

import { current, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes/routes.js';

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (token) => {
    const response = await axios.get(apiRoutes.channelsPath(), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
);
export const sendNewChannel = createAsyncThunk(
  'channels/sendNewChannel',
  async ({ channel, token }) => {
    const response = await axios.post(apiRoutes.channelsPath(), channel, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
);
export const sendRenameChannel = createAsyncThunk(
  'channels/sendRenameChannel',
  async ({ channel, token }) => {
    await axios.patch(apiRoutes.channelPath(channel.id), { name: channel.name }, { headers: { Authorization: `Bearer ${token}` } });
  },
);
export const sendRemoveChannel = createAsyncThunk(
  'channels/sendRemoveChannel',
  async ({ id, token }) => {
    await axios.delete(apiRoutes.channelPath(id), { headers: { Authorization: `Bearer ${token}` } });
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
      state.currentChannelId = id;
    },
    addChannel(state, action) {
      const channel = action.payload;
      state.entities[channel.id] = channel;
      state.ids.push(channel.id);
    },
    renameChannel(state, action) {
      const channel = action.payload;
      state.entities[channel.id] = channel;
    },
    removeChannel(state, action) {
      const idToDelete = action.payload.id;
      state.currentChannelId = state.currentChannelId === idToDelete ? '1' : state.currentChannelId;

      const stateBeforeDelete = current(state);
      const newIds = stateBeforeDelete.ids.filter((id) => id !== idToDelete);
      const newEntitiess = Object.entries(stateBeforeDelete.entities)
        .filter(([id]) => id !== idToDelete);
      state.ids = newIds;
      state.entities = Object.fromEntries(newEntitiess);
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
      .addCase(sendNewChannel.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.currentChannelId = id;
      })
      .addCase(getChannels.rejected, (state, action) => (console.log(action.error)))
      .addCase(sendNewChannel.rejected, (state, action) => (console.log(action.error)))
      .addCase(sendRenameChannel.rejected, (state, action) => (console.log(action.error)))
      .addCase(sendRemoveChannel.rejected, (state, action) => (console.log(action.error)));
  },
});

export const {
  changeChannel, addChannel, renameChannel, removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
