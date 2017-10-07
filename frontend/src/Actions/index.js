import * as ReadableAPI from "../Util/readable-api";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_SORT = "SET_SORT";
export const GET_POSTS = "GET_POSTS";
export const GET_COMMENTS = "GET_COMMENTS";

export function setCategory({ category }) {
  return {
    type: SET_CATEGORY,
    category
  };
}

export function setSort(sort) {
  return {
    type: SET_SORT,
    sort
  };
}

export function receivePosts({ posts, category }) {
  return {
    type: GET_POSTS,
    posts,
    category
  };
}

export const getPosts = category => dispatch => {
  if (category) {
    dispatch(setCategory({ category }));
    ReadableAPI.getPostsByCategory(category).then(posts => {
      return dispatch(receivePosts({ posts }));
    });
  } else {
    ReadableAPI.getPosts().then(posts => dispatch(receivePosts({ posts })));
  }
  return;
};

export function getComments({ postId }) {
  return {
    type: GET_COMMENTS,
    postId
  };
}
