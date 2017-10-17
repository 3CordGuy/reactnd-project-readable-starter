import React, { Component } from "react";
import uuid from "js-uuid";
import { connect } from "react-redux";
import { addPost, editPost, removePost } from "../Actions/posts";
// import { updateComment } from "../Actions/comments";
import { closeModal } from "../Actions/modal";
import { getCategories } from "../Actions/categories";
import { withRouter } from "react-router";

class Modal extends Component {
  state = {
    error: "",
    title: "",
    body: "",
    author: "",
    category: ""
  };

  checkInvalidFields = () => {
    const err = [];
    if (this.props.modal.context === "post") {
      for (let field in this.state) {
        if (field !== "error" && !this.state[field]) {
          err.push(field);
        }
      }
    }
    return err;
  };

  handleSubmit = e => {
    const invalidFields = this.checkInvalidFields();
    if (invalidFields && invalidFields.length > 0) {
      this.setState({
        error: `Please check missing fields: ${invalidFields.join(", ")}`
      });
      return;
    }

    const { title, body, author, category } = this.state;
    const { modal } = this.props;
    const POST = {
      timestamp: Date.now(),
      id: uuid.v4(),
      title,
      body,
      author,
      category
    };

    this.resetState();

    // Determine if modal is open for edit or adding
    if (modal.id) {
      POST.id = modal.id;
      this.props.editPost(POST);
    } else {
      this.props.addPost(POST);
    }

    this.props.closeModal();
    this.props.history.push(`/${POST.category}/${POST.id}`);
    e.preventDefault();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearError = e => {
    this.setState({
      error: ""
    });
    e.preventDefault();
  };

  resetState = () => {
    this.setState({
      error: "",
      title: "",
      author: "",
      body: "",
      category: ""
    });
  };

  componentWillReceiveProps(nextProps) {
    const { modal } = nextProps;
    if (modal && modal.context === "post" && modal.id) {
      const post = nextProps.posts.items.filter(
        post => post.id === modal.id
      )[0];
      this.setState({
        body: post.body,
        author: post.author,
        title: post.title,
        category: post.category
      });
    }
  }

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, posts, modal } = this.props;
    const { error } = this.state;

    return (
      <div className={modal.isOpen ? "modal active" : "modal"}>
        <div className="modal-overlay" />
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title h5">
              {modal.id ? "Edit" : "Add"}{" "}
              {modal.context === "post" ? "Post" : "Comment"}
            </div>
          </div>
          <div className="modal-body bg-secondary">
            <div className="content">
              <form className="container">
                <fieldset
                  disabled={
                    categories.isFetching || (posts.isFetching && "disabled")
                  }
                >
                  <div className="columns">
                    {!modal.id && (
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
                            value={this.state.author}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    )}

                    {!modal.id && (
                      <div className="column col-6">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="category-select"
                          >
                            Category
                          </label>
                          <select
                            className="form-select"
                            name="category"
                            id="category-select"
                            value={this.state.category}
                            onChange={this.handleChange}
                          >
                            <option value="">Select Category</option>
                            {categories.length > 0 &&
                              categories.map(c => (
                                <option key={c.name} value={c.name}>
                                  {c.name.toUpperCase()}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    )}
                    <div className="column col-12">
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
                          value={this.state.title}
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
                          value={this.state.body}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div className="modal-footer clearfix">
            {error && (
              <div className="float-left">
                <div className="toast toast-error">
                  <button
                    className="btn btn-clear float-right"
                    onClick={this.clearError}
                  />
                  {error}
                </div>
              </div>
            )}
            <button
              className="btn btn-lg btn-primary float-right"
              onClick={this.handleSubmit}
            >
              {modal.id ? "Update" : "Submit"}
            </button>
            <button
              className="btn btn-lg mx-2 btn-link"
              onClick={() => {
                this.resetState();
                this.props.closeModal();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts, modal }, ownProps) {
  return {
    ...ownProps,
    categories: categories.items,
    posts,
    modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    editPost: data => dispatch(editPost(data)),
    removePost: data => dispatch(removePost(data)),
    getCategories: data => dispatch(getCategories(data)),
    closeModal: data => dispatch(closeModal())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
