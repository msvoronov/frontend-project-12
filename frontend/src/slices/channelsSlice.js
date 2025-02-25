/* eslint-disable no-param-reassign */

import { current, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';

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
      .addMatcher(
        api.endpoints.getChannels.matchFulfilled,
        (state, action) => (action.payload.forEach((channel) => {
          state.entities[channel.id] = channel;
          state.ids.push(channel.id);
        })),
      );
  },
});

export const {
  changeChannel, addChannel, renameChannel, removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
