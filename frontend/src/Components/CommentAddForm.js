import React, { Component } from "react";

export default class CommentAddForm extends Component {
  render() {
    return (
      <div className="container rounded p-2 bg-secondary">
        <div className="form-group">
          <label className="form-label" htmlFor="author-name">
            Name
          </label>
          <input
            className="form-input"
            type="text"
            id="author-name"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="comment-text">
            Comment
          </label>
          <textarea
            className="form-input"
            id="comment-text"
            placeholder="Type it here..."
            rows="3"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    );
  }
}
