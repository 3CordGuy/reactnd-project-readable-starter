import { combineReducers } from "redux";

import {
  SET_CATEGORY,
  SET_SORT,
  GET_POSTS,
  // VOTE_COMMENT,
  VOTE_POST,
  GET_POST_COMMENTS
} from "../Actions";

const initialPostState = {
  posts: null
};

const initialCategoryState = null;
const initialSortState = "-voteScore";
const initialCommentsState = [];

function category(state = initialCategoryState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      const { category } = action;
      return {
        ...state,
        category
      };
    default:
      return state;
  }
}

function posts(state = initialPostState, action) {
  switch (action.type) {
    case GET_POSTS:
      const { posts } = action;
      return posts;
    case VOTE_POST:
      const { voteScore, id } = action;
      return state.map(post => {
        if (post.id === id) {
          return {
            ...post,
            voteScore
          };
        } else {
          return { ...post };
        }
      });
    default:
      return state;
  }
}

function sort(state = initialSortState, action) {
  switch (action.type) {
    case SET_SORT:
      const { sort } = action;
      return sort;
    default:
      return state;
  }
}

function comments(state = initialCommentsState, action) {
  switch (action.type) {
    case GET_POST_COMMENTS:
      const { comments } = action;
      return [...state, ...comments];
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
  category,
  sort
});
