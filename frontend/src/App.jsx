import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import { routes } from './utils/routes.js';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.notFound} element={<NotFound />} />
      <Route path={routes.chat} element={<Chat />} />
      <Route path={routes.login} element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
