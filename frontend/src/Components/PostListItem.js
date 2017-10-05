import React, { Component } from "react";
import { Link } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import moment from "moment";

export default class PostListItem extends Component {
  render() {
    const { post } = this.props;
    return (
      <div className="card m-2">
        <div className="card-header">
          <Link className="chip float-right" to={`/${post.category}`}>
            {post.category}
          </Link>
          <div className="float-left mx-2">
            <VoteButtons score={post.voteScore} />
          </div>
          <Link className="card-title h5" to={`/${post.category}/${post.id}`}>
            {post.title}
          </Link>
          <div className="card-subtitle text-gray">
            Submitted {moment(post.timestamp).fromNow()} on{" "}
            {moment(post.timestamp).format("MMM Do, YYYY [at] hh:mm a")} by{" "}
            <span className="text-bold">{post.author}</span>
          </div>
          <span className="chip">{post.category}</span>
        </div>
        <div className="card-footer">
          <div className="label m-1">
            <i className="icon icon-message" /> Comments
          </div>
        </div>
      </div>
    );
  }
}
