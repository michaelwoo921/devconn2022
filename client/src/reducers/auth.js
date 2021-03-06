import * as actions from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};
export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case actions.REGISTER_SUCCESS:
    case actions.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case actions.REGISTER_FAILED:
    case actions.AUTH_ERROR:
    case actions.LOGIN_FAILED:
    case actions.LOG_OUT:
    case actions.ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return { ...state, token: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
}
