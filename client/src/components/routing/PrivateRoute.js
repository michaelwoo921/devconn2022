import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Login from '../auth/Login';

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return <Fragment>{isAuthenticated ? <Component /> : <Login />}</Fragment>;
};

export default PrivateRoute;
