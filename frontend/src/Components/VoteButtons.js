import React, { Component } from "react";
import { connect } from "react-redux";
import { handlePostVote, handleCommentVote } from "../Actions";

class VoteButtons extends Component {
  render() {
    const {
      score,
      kind,
      votePost,
      voteComment,
      postId,
      commentId
    } = this.props;

    return (
      <div>
        <button
          className="btn btn-block btn-sm tooltip"
          style={{ marginBottom: 4 }}
          data-tooltip="Upvote"
          onClick={() =>
            kind === "post"
              ? votePost({ id: postId, voteType: "upVote" })
              : voteComment({ id: commentId, voteType: "upVote" })}
        >
          <i className="icon icon-arrow-up" />
        </button>
        <div
          className="btn btn-block btn-sm btn-circle c-auto"
          style={{ marginBottom: 4 }}
        >
          {score}
        </div>
        <button
          className="btn btn-block btn-sm tooltip tooltip-bottom"
          data-tooltip="Downvote"
          onClick={() =>
            kind === "post"
              ? votePost({ id: postId, voteType: "downVote" })
              : voteComment({ id: commentId, voteType: "downVote" })}
        >
          <i className="icon icon-arrow-down" />
        </button>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, sort, category }) {
  return {
    posts,
    comments,
    sort,
    category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: data => dispatch(handlePostVote(data)),
    voteComment: data => dispatch(handleCommentVote(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteButtons);
