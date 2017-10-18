import * as ReadableAPI from "../Util/readable-api";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UP_VOTE_COMMENT = "UP_VOTE_COMMENT";
export const DOWN_VOTE_COMMENT = "DOWN_VOTE_COMMENT";

export const receiveComments = (comments, postId) => ({
  type: RECEIVE_COMMENTS,
  comments,
  postId
});

export const createComment = comment => ({
  type: CREATE_COMMENT,
  comment
});

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment
});

export const deleteComment = comment => ({
  type: DELETE_COMMENT,
  comment
});

export const voteCommentUp = comment => ({
  type: UP_VOTE_COMMENT,
  comment
});

export const voteCommentDown = comment => ({
  type: DOWN_VOTE_COMMENT,
  comment
});

export const getComments = postId => dispatch =>
  ReadableAPI.getCommentsByPost(postId).then(comments =>
    dispatch(receiveComments(comments, postId))
  );

export const addComment = comment => dispatch =>
  ReadableAPI.addComment(comment).then(result => {
    dispatch(createComment(comment));
    dispatch(getComments(comment.parentId));
  });

export const editComment = comment => dispatch =>
  ReadableAPI.updateComment(comment).then(result =>
    dispatch(updateComment(result))
  );

export const removeComment = comment => dispatch =>
  ReadableAPI.deleteComment(comment.id).then(result =>
    dispatch(deleteComment(comment))
  );

export const upVoteComment = comment => dispatch =>
  ReadableAPI.voteComment(comment.id, "upVote").then(newComment =>
    dispatch(voteCommentUp(newComment))
  );

export const downVoteComment = comment => dispatch =>
  ReadableAPI.voteComment(comment.id, "downVote").then(newComment =>
    dispatch(voteCommentDown(newComment))
  );
