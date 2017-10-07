import { combineReducers } from "redux";

import { SET_CATEGORY, SET_SORT, GET_POSTS, GET_COMMENTS } from "../Actions";

const initialPostState = {
  posts: null,
  category: null,
  sort: "-voteScore"
};

function postList(state = initialPostState, action) {
  switch (action.type) {
    case GET_POSTS:
      const { posts } = action;
      return {
        ...state,
        posts
      };
    case SET_CATEGORY:
      const { category } = action;
      return {
        ...state,
        category
      };
    case SET_SORT:
      const { sort } = action;
      return {
        ...state,
        sort
      };
    default:
      return state;
  }
}

const initialCommentsState = {
  comments: null
};

function commentList(state = initialCommentsState, action) {
  const { comments } = action;

  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments
      };
    default:
      return state;
  }
}

export default combineReducers({
  postList,
  commentList
});
