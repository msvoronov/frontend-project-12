/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes/routes.js';

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (token) => {
    const response = await axios.get(apiRoutes.messagesPath(), { headers: { Authorization: `Bearer ${token}` } });    
    return response.data;
  },
);
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({message, token}) => {
    await axios.post(apiRoutes.messagesPath(), message, { headers: { Authorization: `Bearer ${token}` } });
    // const response = await axios.post(apiRoutes.messagesPath(), message, { headers: header });    
    // return response.data;
  },
);
export const editMessage = createAsyncThunk(
  'messages/editMessage',
  async (task) => {
    const { data } = await axios.post(routes.tasksPath(), task);
    return data;
  },
);
export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async (id) => {
    await axios.delete(routes.taskPath(id));
    return id;
  },
);

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
        .addCase(getMessages.fulfilled, (state, action) => {
          const messages = action.payload;
          messages.forEach((message) => {
            state.entities[message.id] = message;
            state.ids.push(message.id);
          });
        })
        // .addCase(sendMessage.fulfilled, (state, action) => {
        //   const message = action.payload;
        //   state.entities[message.id] = message;
        //   state.ids.push(message.id);
        // })
        .addCase(editMessage.fulfilled, (state, action) => {
          const id = action.payload;
          // редактировать message
        })
        .addCase(removeMessage.fulfilled, (state, action) => {
          const id = action.payload;
          // удалить message
        })
        .addCase(getMessages.rejected, (state, action) => (console.log(action.error)))
        .addCase(sendMessage.rejected, (state, action) => (console.log(action.error)));
    }, 
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
