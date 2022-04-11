import * as actions from '../actions/types';
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_ALERT:
      return [...state, payload];
    case actions.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
