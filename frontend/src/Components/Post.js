import React, { Component } from "react";
// import * as ReadableAPI from "../Util/readable-api";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import EditControls from "./EditControls";
import { connect } from "react-redux";
import { getPostComments, getPostDetails } from "../Actions";
import moment from "moment";

class Post extends Component {
  // componentDidMount() {
  //   const { getComments, getPostDetails, post, match } = this.props;
  //   if (post && post.id) {
  //     getComments(post.id);
  //   } else {
  //     getPostDetails(match.params.postId);
  //   }
  // }

  render() {
    const { posts, detailView, comments } = this.props;
    const post = posts.length && posts[0];

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

function mapStateToProps({ comments, posts }, ownProps) {
  const postId = ownProps.postId || ownProps.match.params.postId;
  return {
    comments: comments.filter(
      comment =>
        comment.parentId === (ownProps.match && ownProps.match.params.postId)
    ),
    posts: posts.filter(post => post.id === postId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: data => dispatch(getPostComments(data)),
    getPostDetails: data => dispatch(getPostDetails(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
