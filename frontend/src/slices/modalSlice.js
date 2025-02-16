/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    processedChannel: null,
  },
  reducers: {
    showModal(state, action) {
      const { type, channel } = action.payload;
      state.type = type;
      state.processedChannel = channel;
    },
    hideModal(state) {
      state.type = null;
      state.processedChannel = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
