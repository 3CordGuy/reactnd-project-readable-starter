import { combineReducers } from "redux";

import { SET_CATEGORY, SET_SORT, GET_POSTS, GET_COMMENTS } from "../Actions";

const initialPostState = {
  posts: null
};

const initialCategoryState = {
  category: null
};

const initialSortState = {
  sort: "-voteScore"
};

const initialCommentsState = {
  comments: null
};

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

function sort(state = initialSortState, action) {
  switch (action.type) {
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

function comments(state = initialCommentsState, action) {
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
  posts,
  comments,
  category,
  sort
});
