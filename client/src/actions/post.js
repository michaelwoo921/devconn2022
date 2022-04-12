import * as actions from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({ type: actions.GET_POSTS, payload: res.data });
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLikes = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postid}`);

    dispatch({
      type: actions.UPDATE_LIKES,
      payload: {
        id: postid,
        likes: res.data,
      },
    });
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLikes = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postid}`);

    dispatch({
      type: actions.UPDATE_LIKES,
      payload: {
        id: postid,
        likes: res.data,
      },
    });
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (postid) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postid}`);

    dispatch({
      type: actions.DELETE_POST,
      payload: postid,
    });

    dispatch(setAlert('Post removed', 'success'));
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/posts/`, formData, config);

    dispatch({
      type: actions.ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({ type: actions.GET_POST, payload: res.data });
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addComment = (postid, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postid}`,
      formData,
      config
    );

    dispatch({
      type: actions.ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment added', 'success'));
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteComment = (postid, commentid) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.delete(`/api/posts/comment/${postid}/${commentid}`);

    dispatch({
      type: actions.REMOVE_COMMENT,
      payload: commentid,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: actions.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
