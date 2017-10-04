import React, { Component } from "react";
import * as ReadableAPI from "../Util/readable-api";
import CommentList from "./CommentList";
import VoteButtons from "./VoteButtons";
import moment from "moment";

export default class PostDetails extends Component {
  state = {
    loading: false,
    post: null,
    comments: []
  };

  componentDidMount() {
    // Start Spinner
    this.setState({ loading: true });
    const { postId } = this.props.match.params;

    ReadableAPI.getPostDetails(postId).then(post => {
      console.log(post);
      this.setState({
        post,
        loading: false
      });
    });
  }

  render() {
    console.log(this.props);
    const { post } = this.state;
    const { location } = this.props;

    return (
      <div>
        {post && (
          <div className="card m-2">
            <div className="card-header">
              <span className="chip float-right">{post.category}</span>
              <div className="float-left mx-2">
                <VoteButtons score={post.voteScore} />
              </div>
              <div className="card-title h5">{post.title}</div>
              <div className="card-subtitle text-gray">
                Submitted {moment(post.timestamp).fromNow()} by{" "}
                <span className="text-bold">{post.author}</span>
              </div>
            </div>
            <div className="card-body">{post.body}</div>
            <div className="card-footer">
              <CommentList postId={post.id} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
