import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "js-uuid";
import { addComment } from "../Actions/comments";

class CommentAddForm extends Component {
  state = {
    body: "",
    author: ""
  };

  handleSubmit = e => {
    const { body, author } = this.state;
    const COMMENT = {
      timestamp: Date.now(),
      id: uuid.v4(),
      body,
      author,
      parentId: this.props.postId
    };

    this.props.addComment(COMMENT);
    this.setState({ body: "", author: "" });

    e.preventDefault();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading } = this.state;

    return (
      <form className="container rounded p-2" onSubmit={this.handleSubmit}>
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
        <button
          className={`btn btn-primary ${(!this.state.body && "disabled") ||
            (!this.state.author && "disabled")}`}
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: data => dispatch(addComment(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentAddForm);
