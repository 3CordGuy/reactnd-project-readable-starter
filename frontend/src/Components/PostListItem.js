import React, { Component } from "react";
import moment from "moment";

export default class PostListItem extends Component {
  render() {
    const { post } = this.props;
    return (
      <div className="card m-2">
        <div className="card-header">
          <span className="chip float-right">{post.category}</span>
          <div className="float-left mx-2">
            <button
              className="btn btn-block btn-sm tooltip"
              data-tooltip={`Upvote (${post.voteScore})`}
            >
              <i className="icon icon-arrow-up" />
            </button>
            <button
              className="btn btn-block btn-sm tooltip tooltip-bottom"
              data-tooltip={`Downvote (${post.voteScore})`}
            >
              <i className="icon icon-arrow-down" />
            </button>
          </div>
          <div className="card-title h5">{post.title}</div>
          <div className="card-subtitle text-gray">
            Submitted {moment(post.timestamp).fromNow()} by{" "}
            <span className="text-bold">{post.author}</span>
          </div>
        </div>
        <div className="card-body">{post.body}</div>
        <div className="card-footer" />
      </div>
    );
  }
}
