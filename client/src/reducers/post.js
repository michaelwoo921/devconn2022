import * as actions from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_POSTS:
      return { ...state, posts: payload, loading: false };
    case actions.GET_POST:
      return { ...state, post: payload, loading: false };
    case actions.ADD_POST:
      return { ...state, posts: [...state.posts, payload], loading: false };
    case actions.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case actions.POST_ERROR:
      return { ...state, error: payload, loading: false };

    case actions.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case actions.ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case actions.REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };
    default:
      return state;
  }
}
