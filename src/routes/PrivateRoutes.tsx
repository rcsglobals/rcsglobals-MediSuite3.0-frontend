import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isAuthenticated, ...rest }) => {

  const location: any = useLocation();
  const currentPath: any = location.pathname;
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={currentPath} />
      }
    />
  );
};

export default PrivateRoute;
