import { combineReducers } from "redux";
import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST
} from "../Actions/posts";
import {
  RECEIVE_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT
} from "../Actions/comments";
import { RECEIVE_CATEGORIES } from "../Actions/categories";
import { SORT_POSTS } from "../Actions/sort";

function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS: {
      const { posts } = action;

      return {
        ...state,
        posts: posts.filter(post => !post.deleted)
      };
    }

    case RECEIVE_POST: {
      const { post } = action;
      const posts = [...state, post];
      return {
        ...state,
        posts
      };
    }

    case CREATE_POST: {
      const { post } = action;
      const posts = [...state, post];
      return {
        ...state,
        posts
      };
    }

    case UPDATE_POST: {
      const { post } = action;
      const posts = state.posts.reduce((postArr, curPost) => {
        if (post.id === curPost.id) {
          [...posts, curPost];
        }
      }, []);
      return {
        ...state,
        posts
      };
    }

    case DELETE_POST: {
      const { postId } = action;
      const posts = state.posts.filter(post => post !== postId);

      return {
        ...state,
        posts
      };
    }

    case DOWN_VOTE_POST:

    case UP_VOTE_POST:
      const { post } = action;
      const posts = state.posts.reduce((postArr, curPost) => {
        if (post.id === curPost.id) {
          [...posts, curPost];
        }
      }, []);
      return {
        ...state,
        posts
      };

    default:
      return state;
  }
}

function categories(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { category } = action;
      return {
        ...state,
        categories
      };
    default:
      return state;
  }
}

function sort(state = { sort: "-voteScore" }, action) {
  switch (action.type) {
    case SORT_POSTS:
      const { sort } = action;
      return sort;
    default:
      return {
        ...state,
        sort
      };
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
  sort
});
