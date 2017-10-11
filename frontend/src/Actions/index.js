import * as ReadableAPI from "../Util/readable-api";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_SORT = "SET_SORT";
export const VOTE_POST = "VOTE_POST";
export const VOTE_COMMENT = "VOTE_COMMENT";
export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const GET_POST_COMMENTS = "GET_POST_COMMENTS";

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

export function votePost({ id, voteScore }) {
  return {
    type: VOTE_POST,
    id,
    voteScore
  };
}

export function voteComment({ id, voteScore }) {
  return {
    type: VOTE_COMMENT,
    id,
    voteScore
  };
}

export const handlePostVote = ({ id, voteType }) => dispatch => {
  console.log("handling vote post");
  ReadableAPI.votePost(id, voteType).then(response => {
    return dispatch(
      votePost({ id: response.id, voteScore: response.voteScore })
    );
  });
  return;
};

export const handleCommentVote = ({ id, voteType }) => dispatch => {
  console.log("handling comment post");
  ReadableAPI.voteComment(id, voteType).then(response => {
    return dispatch(
      voteComment({ id: response.id, voteScore: response.voteScore })
    );
  });
  return;
};

export function receivePost(post) {
  return {
    type: GET_POST,
    post
  };
}

export function receivePosts(posts) {
  return {
    type: GET_POSTS,
    posts
  };
}

export const getPosts = category => dispatch => {
  if (category) {
    dispatch(setCategory({ category }));
    ReadableAPI.getPostsByCategory(category).then(posts => {
      return dispatch(receivePosts(posts));
    });
  } else {
    ReadableAPI.getPosts().then(posts => dispatch(receivePosts(posts)));
  }
  return;
};

export const getPostDetails = id => dispatch => {
  ReadableAPI.getPostDetails(id).then(post => dispatch(receivePost(post)));
  return;
};

export function receivePostComments(comments) {
  return {
    type: GET_POST_COMMENTS,
    comments
  };
}

export const getPostComments = postId => dispatch => {
  ReadableAPI.getCommentsByPost(postId).then(comments => {
    return dispatch(receivePostComments(comments));
  });
  return;
};
