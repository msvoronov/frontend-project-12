/* eslint-disable no-param-reassign */

import { current, createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ids: [],
    entities: {},
    currentChannelId: '1',
    error: null,
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
});

export const {
  changeChannel, addChannel, renameChannel, removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
