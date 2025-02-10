import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/index.js';
import { routes } from '../utils/routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to={routes.login} />
  );
};

export default PrivateRoute;
