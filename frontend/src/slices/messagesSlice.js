/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    addMessage(state, action) {
      const { message } = action.payload;

      state.entities[message.id] = message;
      state.ids.push(message.id);
    },
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
