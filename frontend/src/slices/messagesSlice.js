/* eslint-disable no-param-reassign */

import { current, createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    addMessage(state, action) {
      const message = action.payload;
      state.entities[message.id] = message;
      state.ids.push(message.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const channelIdToDelete = action.payload.id;
        const stateBeforeDelete = current(state);
        const newEntitiess = Object
          .entries(stateBeforeDelete.entities)
          .filter((entries) => {
            const message = entries[1];
            return message.channelId !== channelIdToDelete;
          });
        const newIds = newEntitiess.map(([id]) => id);
        state.ids = newIds;
        state.entities = Object.fromEntries(newEntitiess);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
