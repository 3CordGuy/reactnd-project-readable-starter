import React, { Component } from "react";
import * as ReadableAPI from "../Util/readable-api";
import uuid from "js-uuid";

export default class CommentAddForm extends Component {
  state = {
    body: "",
    author: "",
    loading: false
  };

  handleSubmit = e => {
    this.setState({ loading: true });
    const { body, author } = this.state;
    const COMMENT = {
      timestamp: Date.now(),
      id: uuid.v4(),
      body,
      author,
      parentId: this.props.postId
    };

    ReadableAPI.addComment(COMMENT).then(response => {
      this.setState({
        loading: false,
        body: "",
        author: ""
      });
    });

    e.preventDefault();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading } = this.state;

    return (
      <form
        className="container rounded p-2 bg-secondary"
        onSubmit={this.handleSubmit}
      >
        <fieldset disabled={loading && "disabled"}>
          <div className="form-group">
            <label className="form-label" htmlFor="author-name">
              Name
            </label>
            <input
              className="form-input"
              type="text"
              id="author-name"
              placeholder="Name"
              name="author"
              onChange={this.handleChange}
              value={this.state.author}
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
              name="body"
              onChange={this.handleChange}
              value={this.state.body}
            />
          </div>
        </fieldset>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
