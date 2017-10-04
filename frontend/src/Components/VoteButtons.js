import React, { Component } from "react";

export default class VoteButtons extends Component {
  render() {
    const { score } = this.props;

    return (
      <div>
        <button
          className="btn btn-block btn-sm tooltip"
          style={{ marginBottom: 4 }}
          data-tooltip="Upvote"
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
        >
          <i className="icon icon-arrow-down" />
        </button>
      </div>
    );
  }
}
