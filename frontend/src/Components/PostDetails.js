import React, { Component } from "react";
import * as ReadableAPI from "../Util/readable-api";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import EditControls from "./EditControls";
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
      this.setState({
        post,
        loading: false
      });
    });
  }

  render() {
    const { post } = this.state;

    return (
      <div>
        {post && (
          <div className="card m-2">
            <div className="card-header">
              <span className="float-right">
                <EditControls
                  isPrimary={true}
                  label="POST CONTROLS"
                  onEditHandler={() => console.log("Clicked Edit Post")}
                  onDeleteHandler={() => console.log("Clicked Delete Post")}
                />
              </span>
              <div className="float-left mx-2">
                <VoteButtons score={post.voteScore} />
              </div>
              <div className="card-title h5">{post.title}</div>
              <div className="card-subtitle text-gray">
                Submitted {moment(post.timestamp).fromNow()} by{" "}
                <span className="text-bold">{post.author}</span>
              </div>
              <Link className="chip" to={`/${post.category}`}>
                {post.category}
              </Link>
            </div>
            <div className="card-body">{post.body}</div>
            <div className="card-footer">
              <CommentSection postId={post.id} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
