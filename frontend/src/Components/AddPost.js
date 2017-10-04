import React, { Component } from "react";
// import { Link } from "react-router-dom";

export default class AddPost extends Component {
  render() {
    const { goBack } = this.props.history;

    return (
      <div className="container">
        <h4>Add New Post</h4>
        <div className="rounded p-2 bg-secondary">
          <div className="column col-6">
            <div className="form-group">
              <label className="form-label" htmlFor="author-name">
                Name
              </label>
              <input
                className="form-input"
                type="text"
                id="author-name"
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category-select">Category</label>
              <select className="form-select" id="category-select">
                <option value="">Select Category</option>
                <option>Slack</option>
                <option>Skype</option>
                <option>Hipchat</option>
              </select>
            </div>
          </div>
          <div className="column">
            <div className="col-12">
              <div className="form-group">
                <label className="form-label" htmlFor="comment-text">
                  Post Body
                </label>
                <textarea
                  className="form-input"
                  id="comment-text"
                  placeholder="Type it here..."
                  rows="3"
                />
              </div>
            </div>
          </div>
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
      </div>
    );
  }
}
