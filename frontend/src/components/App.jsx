import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from './Page404.jsx';
import Login from './Login.jsx';
import Main from './Main.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
