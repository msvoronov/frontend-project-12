import React, { useMemo } from 'react';
import { io } from 'socket.io-client';
import ApiContext from './ApiContext.js';

const ApiContextProvider = ({ children }) => {
  const socket = io();
  const value = useMemo(() => ({ socket }), [socket]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
