import React, { Component } from "react";
import Comment from "./Comment";
import CommentAddForm from "./CommentAddForm";
import * as ReadableAPI from "../Util/readable-api";
import sortBy from "sort-by";

export default class CommentList extends Component {
  state = {
    comments: [],
    loading: false
  };

  componentDidMount() {
    // Start Spinner
    this.setState({ loading: true });
    const { postId } = this.props;

    ReadableAPI.getCommentsByPost(postId).then(comments => {
      this.setState({
        comments,
        loading: false
      });
    });
  }

  render() {
    const { comments } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-title">Add a Comment</div>
        </div>
        <div className="card-body">
          <CommentAddForm />
        </div>
        <div className="card-footer">
          <h6>{comments.length} Comments</h6>
          {comments &&
            comments
              .sort(sortBy("-voteScore", "-timestamp"))
              .map(comment => <Comment key={comment.id} comment={comment} />)}
        </div>
      </div>
    );
  }
}
