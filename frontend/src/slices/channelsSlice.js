/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ids: [],
    entities: {},
    currentChannelId: '1',
  },
  reducers: {
    addChannel(state, action) {
      const { channel } = action.payload;

      state.entities[channel.id] = channel;
      state.ids.push(channel.id);
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
