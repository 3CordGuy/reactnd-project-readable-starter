import React, { Component } from "react";
// import { Link } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import moment from "moment";

export default class PostListItem extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="tile bg-gray p-2 m-2">
        <div className="tile-icon">
          <div className="example-tile-icon">
            <VoteButtons score={comment.voteScore} />
          </div>
        </div>
        <div className="tile-content">
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
