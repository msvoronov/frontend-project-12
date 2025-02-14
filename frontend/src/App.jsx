import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.jsx';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import { routes } from './routes/routes.js';

const App = () => (
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
);

export default App;
