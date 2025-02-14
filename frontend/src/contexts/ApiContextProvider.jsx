import React, { useMemo } from 'react';
import { io } from 'socket.io-client'
import ApiContext from './ApiContext.js';

const ApiContextProvider = ({ children }) => {
  const socket = io();
  // оставить только сокет, остальное закомменировать и делать без емитов
  const value = useMemo(() => {
    // const addNewMessage = (message, cb) => {
    //   socket.emit("newMessage", message, (response) => {
    //     cb(response)
    //   });      
    // };
    // const addNewChannel = (channel, cb) => {
    //   socket.emit("newChannel", channel, (response) => {
    //     cb(response)
    //   });
    // };
    // const renameChannel = (channel, cb) => {
    //   socket.emit("renameChannel", channel, (response) => {
    //     cb(response)
    //   });
    // };
    // const removeChannel = (channel, cb) => {
    //   socket.emit("removeChannel", channel, (response) => {
    //     cb(response)
    //   });
    // };
    return {
      // addNewMessage,
      // addNewChannel,
      // renameChannel,
      // removeChannel,
      socket,
    }
  }, [socket]);  

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
