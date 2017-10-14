import * as ReadableAPI from "../Util/readable-api";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const CREATE_POST = "CREATE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const UP_VOTE_POST = "UP_VOTE_POST";
export const DOWN_VOTE_POST = "DOWN_VOTE_POST";

export const requestPosts = () => {
  return {
    type: REQUEST_POSTS
  };
};

export const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

export const receivePost = post => {
  return {
    type: RECEIVE_POST,
    post
  };
};

export const createPost = post => {
  return {
    type: CREATE_POST,
    post
  };
};

export const updatePost = post => {
  return {
    type: UPDATE_POST,
    post
  };
};

export const deletePost = postId => {
  return {
    type: DELETE_POST,
    postId
  };
};

export const votePostUp = post => {
  return {
    type: UP_VOTE_POST,
    post
  };
};

export const votePostDown = post => {
  return {
    type: DOWN_VOTE_POST,
    post
  };
};

export const getPosts = () => dispatch => {
  dispatch(requestPosts());
  ReadableAPI.getPosts().then(posts => dispatch(receivePosts(posts)));
};

export const getPost = postId => dispatch => {
  dispatch(requestPosts());
  ReadableAPI.getPostDetails(postId).then(post => dispatch(receivePost(post)));
};

export const getCategoryPosts = category => dispatch => {
  dispatch(requestPosts());
  ReadableAPI.getPostsByCategory(category).then(posts =>
    dispatch(receivePosts(posts))
  );
};

export const addPost = post => dispatch => {
  ReadableAPI.addPost(post).then(res => dispatch(createPost(post)));
};

export const editPost = post => dispatch =>
  ReadableAPI.updatePost(post).then(post => dispatch(updatePost(post)));

export const removePost = postId => dispatch => {
  ReadableAPI.deletePost(postId).then(res => dispatch(deletePost(postId)));
};

export const upVotePost = postId => dispatch =>
  ReadableAPI.votePost(postId, "upVote").then(post =>
    dispatch(votePostUp(post))
  );

export const downVotePost = postId => dispatch =>
  ReadableAPI.votePost(postId, "downVote").then(post =>
    dispatch(votePostDown(post))
  );
