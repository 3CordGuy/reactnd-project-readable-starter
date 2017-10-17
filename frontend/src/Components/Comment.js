import React, { Component } from "react";
import VoteButtons from "./VoteButtons";
import EditControls from "./EditControls";
import { connect } from "react-redux";
import {
  removeComment,
  upVoteComment,
  downVoteComment
} from "../Actions/comments";
import moment from "moment";

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="tile bg-gray p-2 m-2">
        <div className="tile-icon">
          <div className="example-tile-icon">
            <VoteButtons
              score={comment.voteScore}
              kind="comment"
              comment={comment}
              onUpVote={this.props.upVoteComment}
              onDownVote={this.props.downVoteComment}
            />
          </div>
        </div>
        <div className="tile-content">
          <EditControls
            label="COMMENT CONTROLS"
            onEditHandler={() => console.log("Clicked Edit Comment")}
            onDeleteHandler={() => this.props.removeComment(comment)}
          />
          <p className="tile-title">
            <span className="text-bold">{comment.author}</span> posted{" "}
            {moment(comment.timestamp).fromNow()} on{" "}
            {moment(comment.timestamp).format("MMM Do, YYYY [at] hh:mm a")}
          </p>
          <p className="tile-subtitle text-gray">{comment.body}</p>
        </div>
        <div className="tile-action">
          <div className="divider" />
        </div>
      </div>
    );
  }
}
function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    upVoteComment: data => dispatch(upVoteComment(data)),
    downVoteComment: data => dispatch(downVoteComment(data)),
    removeComment: data => dispatch(removeComment(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
