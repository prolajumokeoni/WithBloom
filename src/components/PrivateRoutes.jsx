import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, authenticated, ...rest }) => {
  return authenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/signin" state={{ from: rest.location.pathname }} />
  );
};

export default PrivateRoute;
