import React, { Component } from "react";
import { connect } from "react-redux";
import {
  upVotePost,
  downVotePost
  // handleCommentVote
} from "../Actions/posts";

class VoteButtons extends Component {
  render() {
    const {
      score,
      kind,
      upVotePost,
      downVotePost,
      // voteComment,
      postId
      // commentId
    } = this.props;

    return (
      <div>
        <button
          className="btn btn-block btn-sm tooltip"
          style={{ marginBottom: 4 }}
          data-tooltip="Upvote"
          onClick={() =>
            kind === "post"
              ? upVotePost(postId)
              : console.log("DOWNVOTE COMMENT")}
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
              ? downVotePost(postId)
              : console.log("DOWNVOTE COMMENT")}
        >
          <i className="icon icon-arrow-down" />
        </button>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, sort, categories }) {
  return {
    posts,
    comments,
    sort,
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    upVotePost: data => dispatch(upVotePost(data)),
    downVotePost: data => dispatch(downVotePost(data))
    // voteComment: data => dispatch(handleCommentVote(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteButtons);
