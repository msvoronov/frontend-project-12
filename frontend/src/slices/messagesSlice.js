/* eslint-disable no-param-reassign */

import { current, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes/routes.js';
import { removeChannel } from './channelsSlice.js';

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (token) => {
    const response = await axios.get(apiRoutes.messagesPath(), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
);
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ message, token }) => {
    const response = await axios.post(apiRoutes.messagesPath(), message, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    ids: [],
    entities: {},
    error: null,
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
      })
      // fulfilled
      .addCase(getMessages.fulfilled, (state, action) => {
        const messages = action.payload;
        messages.forEach((message) => {
          state.entities[message.id] = message;
          state.ids.push(message.id);
        });
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.error = null;
      })
      // rejected
      .addCase(getMessages.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
