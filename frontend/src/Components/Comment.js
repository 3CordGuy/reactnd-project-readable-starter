import React, { Component } from "react";
import VoteButtons from "./VoteButtons";
import EditControls from "./EditControls";
import { connect } from "react-redux";
import {
  editComment,
  removeComment,
  upVoteComment,
  downVoteComment
} from "../Actions/comments";
import moment from "moment";

class Comment extends Component {
  state = {
    editing: false,
    body: ""
  };

  handleSubmit = () => {
    const { comment } = this.props;

    this.props.editComment({
      id: comment.id,
      timestamp: Date.now(),
      body: this.state.body
    });

    this.setState({
      editing: false,
      body: ""
    });
  };

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
          {!this.state.editing && (
            <EditControls
              label="COMMENT CONTROLS"
              onEditHandler={() =>
                this.setState({ editing: true, body: comment.body })}
              onDeleteHandler={() => this.props.removeComment(comment)}
            />
          )}

          <p className="tile-title">
            <span className="text-bold">{comment.author}</span> posted{" "}
            {moment(comment.timestamp).fromNow()} on{" "}
            {moment(comment.timestamp).format("MMM Do, YYYY [at] hh:mm a")}
          </p>

          {this.state.editing ? (
            <form>
              <textarea
                className="form-input"
                id="comment-text"
                placeholder="Type it here..."
                rows="3"
                name="body"
                onChange={e => this.setState({ body: e.target.value })}
                value={this.state.body}
              />
              <div className="btn-group mt-2 float-right">
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  <i className="icon icon-check" />
                </button>
                <button
                  className="btn"
                  onClick={() => this.setState({ body: "", editing: false })}
                >
                  <i className="icon icon-stop" />
                </button>
              </div>
            </form>
          ) : (
            <p className="tile-subtitle text-gray">{comment.body}</p>
          )}
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
    editComment: data => dispatch(editComment(data)),
    removeComment: data => dispatch(removeComment(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
