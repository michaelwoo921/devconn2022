import axios from 'axios';
import * as actions from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    console.log(res.data.user);
    dispatch({
      type: actions.USER_LOADED,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({ type: actions.AUTH_ERROR });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const response = await axios.post('/api/users', body, config);
      console.log(response.data);
      dispatch({
        type: actions.REGISTER_SUCCESS,
        payload: response.data,
      });
      dispatch(loadUser());
    } catch (err) {
      console.log(err.response.data);
      const { errors } = err.response.data;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'danger', 1000))
        );
      }

      dispatch({ type: actions.REGISTER_FAILED });
    }
  };

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const body = JSON.stringify({ email, password });
  try {
    const response = await axios.post('/api/auth', body, config);
    console.log(response.data);
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: response.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data);
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 1000)));
    }

    dispatch({ type: actions.LOGIN_FAILED });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: actions.CLEAR_PROFILE });
  dispatch({ type: actions.LOG_OUT });
};
