import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routes } from './routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  return (
    auth.loggedIn ? children : <Navigate to={routes.login} />
  );
};

export default PrivateRoute;
