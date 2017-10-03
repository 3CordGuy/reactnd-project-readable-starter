const api = "localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

/**
 * getPostsByCategory
 * @param {String} category
 * @return {Array} category array
 */
export const getPostsByCategory = category =>
  fetch(`${api}/${category}/posts/`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * getCategories
 * @return {Array} category array
 */
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * getPosts
 * @return {Array} category array
 */
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * addPost
 * @param {Object} post {id, timestamp, title, body, author, category}
 */
export const addPost = post =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => data.books);

/**
 * getPostDetails
 * @param {String} postId
 */
export const getPostDetails = postId =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * votePost
 * @param {String} postId
 * @param {String} vote either "upVote" or "downVote"
 */
export const votePost = (postId, vote) =>
  fetch(`${api}/posts/${postId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: vote
  }).then(res => res.json());

/**
 * updatePost
 * @param {Object} post {id, title, body}
 */
export const updatePost = post =>
  fetch(`${api}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: post.title, body: post.body })
  }).then(res => res.json());

/**
 * deletePost
 * @param {String} id
 */
export const deletePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());

/**
 * getCommentsByPost
 * @param {String} id
 */
export const getCommentsByPost = id =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * addComment
 * @param {Object} comment {id, timestamp, body, author, parentId}
 */
export const addComment = comment =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => data.books);

/**
 * getCommentDetails
 * @param {String} id
 */
export const getCommentDetails = id =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * votePost
 * @param {String} commentId
 * @param {String} vote either "upVote" or "downVote"
 */
export const voteComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: vote
  })
    .then(res => res.json())
    .then(data => data.books);

/**
 * updateComment
 * @param {Object} comment {id, timestamp, body}
 */
export const updateComment = comment =>
  fetch(`${api}/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ timestamp: comment.title, body: comment.body })
  }).then(res => res.json());

/**
 * deleteComment
 * @param {String} id
 */
export const deleteComment = id =>
  fetch(`${api}/comments/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
