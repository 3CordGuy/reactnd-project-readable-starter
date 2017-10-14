import { combineReducers } from "redux";
import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  REQUEST_POSTS
} from "../Actions/posts";
import {
  RECEIVE_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT
} from "../Actions/comments";
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from "../Actions/categories";
import { SORT_POSTS } from "../Actions/sort";
import { OPEN_MODAL, CLOSE_MODAL } from "../Actions/modal";

function posts(state = { items: [], isFetching: false }, action) {
  switch (action.type) {
    case REQUEST_POSTS: {
      return {
        ...state,
        isFetching: true
      };
    }

    case RECEIVE_POSTS: {
      const { posts } = action;

      return {
        ...state,
        items: posts.filter(post => !post.deleted),
        isFetching: false
      };
    }

    case RECEIVE_POST: {
      const { post } = action;
      const items = [...state, post];
      return {
        ...state,
        items,
        isFetching: false
      };
    }

    case CREATE_POST: {
      const { post } = action;
      const items = [...state, post];
      return {
        ...state,
        items,
        isFetching: false
      };
    }

    case UPDATE_POST: {
      const items = state.items.map(
        curPost => (curPost.id === action.post.id ? action.post : curPost)
      );

      return {
        ...state,
        items,
        isFetching: false
      };
    }

    case DELETE_POST: {
      const { postId } = action;
      const items = state.items.filter(post => post !== postId);

      return {
        ...state,
        items,
        isFetching: false
      };
    }

    case DOWN_VOTE_POST:
    case UP_VOTE_POST:
      const items = state.items.map(
        curPost => (curPost.id === action.post.id ? action.post : curPost)
      );

      return {
        ...state,
        items,
        isFetching: false
      };

    default:
      return state;
  }
}

function categories(state = { items: [], isFetching: false }, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES: {
      return {
        ...state,
        isFetching: true
      };
    }
    case RECEIVE_CATEGORIES:
      const { categories } = action;
      const items = [...state, ...categories];
      return {
        ...state,
        items,
        isFetching: false
      };
    default:
      return state;
  }
}

function sort(state = "-voteScore", action) {
  switch (action.type) {
    case SORT_POSTS:
      const { sort } = action;
      return sort;
    default:
      return state;
  }
}

function modal(state = { isOpen: false, postId: null }, action) {
  switch (action.type) {
    case OPEN_MODAL:
      const { postId } = action;
      return {
        ...state,
        isOpen: true,
        postId
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        postId: null
      };
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      const { comments, postId } = action;
      return {
        ...state,
        [postId]: comments.filter(comment => comment.deleted !== true)
      };

    // TODO: ADD MORE REDUCER CASES FOR COMMENTS

    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
  categories,
  sort,
  modal
});
