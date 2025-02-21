import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './routes/PrivateRoute.jsx';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Chat from './pages/Chat.jsx';
import HeaderNavbar from './components/HeaderNavbar.jsx';
import { routes } from './routes/routes.js';

const App = () => {
  const rollbarConfig = {
    accessToken: 'b1de627435e5479aac6cfd879ae3c1b6',
    environment: 'production',
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <HeaderNavbar />
            <Routes>
              <Route path={routes.notFound} element={<NotFound />} />
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.signup} element={<Signup />} />
              <Route
                path={routes.chat}
                element={(
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                  )}
              />
            </Routes>
          </div>
          <ToastContainer />
        </BrowserRouter>
        </ErrorBoundary>
    </Provider>
  );
}

export default App;
