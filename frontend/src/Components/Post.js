import React, { Component } from "react";
// import * as ReadableAPI from "../Util/readable-api";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import EditControls from "./EditControls";
import { connect } from "react-redux";
import { getPostComments } from "../Actions";
import moment from "moment";

class Post extends Component {
  // state = {
  //   loading: false,
  //   post: null,
  //   comments: []
  // };

  componentDidMount() {
    const { getComments, post } = this.props;
    post && post.id && getComments(post.id);
  }

  render() {
    const { post, detailView, comments } = this.props;

    return (
      <div>
        {post && (
          <div className="card m-2">
            <div className="card-header">
              <div>
                {detailView && (
                  <span className="float-right">
                    <EditControls
                      isPrimary={true}
                      label="POST CONTROLS"
                      onEditHandler={() => console.log("Clicked Edit Post")}
                      onDeleteHandler={() => console.log("Clicked Delete Post")}
                    />
                  </span>
                )}
              </div>
              <div className="float-left mx-2">
                <VoteButtons
                  score={post.voteScore}
                  kind="post"
                  postId={post.id}
                />
              </div>
              <div className="card-title h5">
                {detailView ? (
                  post.title
                ) : (
                  <Link
                    className="card-title h5"
                    to={`/${post.category}/${post.id}`}
                  >
                    {post.title}
                  </Link>
                )}
              </div>
              <div className="card-subtitle text-gray">
                Submitted {moment(post.timestamp).fromNow()} by{" "}
                <span className="text-bold">{post.author}</span>
              </div>
              <Link className="chip" to={`/${post.category}`}>
                {post.category}
              </Link>
            </div>
            <div>
              <div className="card-body">{detailView && post.body}</div>
              <div className="card-footer">
                {detailView ? (
                  <CommentSection postId={post.id} />
                ) : (
                  <div className="label m-1">
                    <i className="icon icon-message" /> {comments.length}{" "}
                    Comments
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ comments }, ownProps) {
  return {
    comments: comments.filter(
      comment => comment.parentId === (ownProps.post && ownProps.post.id)
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: data => dispatch(getPostComments(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
