import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/AuthProvider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import { routes } from './utils/routes.js';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.notFound} element={<NotFound />} />
        <Route path={routes.login} element={<Login />} />
        <Route
          path={routes.chat}
          element={(
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
