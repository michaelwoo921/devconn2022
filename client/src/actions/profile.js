import * as actions from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({ type: actions.GET_PROFILE, payload: res.data });
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: actions.CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');
    dispatch({ type: actions.GET_PROFILES, payload: res.data });
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileById = (userid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userid}`);
    dispatch({ type: actions.GET_PROFILE, payload: res.data });
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({ type: actions.GET_REPOS, payload: res.data });
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/profile', formData, config);
      dispatch({ type: actions.GET_PROFILE, payload: res.data });

      dispatch(setAlert('Profile Created', 'success', 5000));
    } catch (err) {
      dispatch({
        type: actions.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });

      const { errors } = err.response.data;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'danger', 1000))
        );
      }
    }
  };

export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.put('/api/profile/experience', formData);

    dispatch({
      type: actions.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));

    navigate('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: actions.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.put('/api/profile/education', formData);

    dispatch({
      type: actions.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    navigate('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: actions.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: actions.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: actions.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: actions.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: actions.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      await axios.delete(`/api/profile`);
      dispatch({
        type: actions.CLEAR_PROFILE,
      });
      dispatch({ type: actions.ACCOUNT_DELETED });
      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: actions.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
