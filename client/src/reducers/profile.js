import * as actions from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: null,
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_PROFILE:
    case actions.UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false };
    case actions.PROFILE_ERROR:
      return { ...state, loading: false, error: payload };
    case actions.CLEAR_PROFILE:
      return { ...state, loading: false, profile: null, repos: [] };

    default:
      return state;
  }
}
