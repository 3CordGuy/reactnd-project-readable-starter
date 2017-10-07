import React, { Component } from "react";
import * as ReadableAPI from "../Util/readable-api";
import uuid from "js-uuid";
// import { Link } from "react-router-dom";

export default class AddPost extends Component {
  state = {
    loading: false,
    categories: [],
    title: "",
    body: "",
    author: "",
    category: ""
  };

  handleSubmit = e => {
    this.setState({ loading: true });
    const { title, body, author, category } = this.state;
    const POST = {
      timestamp: Date.now(),
      id: uuid.v4(),
      title,
      body,
      author,
      category
    };

    ReadableAPI.addPost(POST).then(response => {
      this.props.history.goBack();
      this.setState({
        loading: false
      });
    });

    e.preventDefault();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    // Start Spinner
    this.setState({ loading: true });

    ReadableAPI.getCategories().then(response => {
      console.log(response.categories);
      this.setState({
        categories: response.categories,
        loading: false
      });
    });
  }
  render() {
    const { goBack } = this.props.history;
    const { categories, loading } = this.state;

    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <h4>Add New Post</h4>
        <div className="rounded p-2 bg-secondary">
          <fieldset disabled={loading && "disabled"}>
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
                  {categories &&
                    categories.length &&
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
