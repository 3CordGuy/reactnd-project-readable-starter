import React, { Component } from "react";
import * as ReadableAPI from "../Util/readable-api";
import uuid from "js-uuid";
import { connect } from "react-redux";
import { addPost, removePost } from "../Actions/posts";
import { getCategories } from "../Actions/categories";
// import { Link } from "react-router-dom";

class AddPost extends Component {
  state = {
    error: "",
    title: "",
    body: "",
    author: "",
    category: ""
  };

  handleSubmit = e => {
    const { title, body, author, category } = this.state;
    const POST = {
      timestamp: Date.now(),
      id: uuid.v4(),
      title,
      body,
      author,
      category
    };

    ReadableAPI.addPost(POST).then(res => {
      console.log(res);
      if (res && res.id) {
        this.props.addPost(POST);
        this.props.history.goBack();
      } else {
        this.props.removePost(POST.id);
        this.setState({ error: "Trouble Saving Post! Try again later..." });
      }
    });
    e.preventDefault();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearError = e => {
    this.setState({ error: "" });
    e.preventDefault();
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { goBack } = this.props.history;
    const { categories, posts } = this.props;
    const { error } = this.state;

    return (
      <form className="container" onSubmit={this.handleSubmit}>
        {error && (
          <div className="col-12 mt-2">
            <div className="toast toast-error m-2">
              <button
                className="btn btn-clear float-right"
                onClick={this.clearError}
              />
              {error}
            </div>
          </div>
        )}
        <h4>Add New Post</h4>
        <div className="rounded p-2 bg-secondary">
          <fieldset
            disabled={categories.isFetching || (posts.isFetching && "disabled")}
          >
            <div className="column col-6">
              <div className="form-group">
                <label className="form-label" htmlFor="author-name">
                  Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="author-name"
                  name="author"
                  placeholder="Your Name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category-select">Category</label>
                <select
                  className="form-select"
                  name="category"
                  id="category-select"
                  onChange={this.handleChange}
                >
                  <option value="">Select Category</option>
                  {categories.length > 0 &&
                    categories.map(c => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="column">
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label" htmlFor="title-field">
                    Title
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    name="title"
                    id="title-field"
                    placeholder="Post Title"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="comment-text">
                    Post Body
                  </label>
                  <textarea
                    className="form-input"
                    name="body"
                    id="comment-text"
                    placeholder="Type it here..."
                    rows="3"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <div className="column">
            <div className="col-6 mt-2">
              <div className="form-group">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
                <button className="btn btn-link" onClick={goBack}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories: categories.items,
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    removePost: data => dispatch(removePost(data)),
    getCategories: data => dispatch(getCategories(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
