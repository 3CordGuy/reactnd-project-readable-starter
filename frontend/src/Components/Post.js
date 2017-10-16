import React, { Component } from "react";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import EditControls from "./EditControls";
import { connect } from "react-redux";
import { getPost, removePost } from "../Actions/posts";
import { getComments } from "../Actions/comments";
import moment from "moment";
import { withRouter } from "react-router";

class Post extends Component {
  componentDidMount() {
    const { getComments, getPost, posts, match } = this.props;
    const reduxPostId = posts && posts.length && posts[0].id;
    const routePostId = match && match.params && match.params.postId;

    if (reduxPostId) {
      getComments(reduxPostId);
    } else {
      getPost(routePostId);
    }
  }

  render() {
    const { posts, detailView, comments } = this.props;
    const post = posts.length && posts[0];

    return (
      <div>
        {post && (
          <div className="card bg-gray m-2">
            <div className="card-header">
              <div>
                {detailView && (
                  <span className="float-right">
                    <EditControls
                      isPrimary={true}
                      label="POST CONTROLS"
                      onEditHandler={() => console.log("Clicked Edit Post")}
                      onDeleteHandler={() => {
                        this.props.removePost(post.id);
                        this.props.history.push("/");
                      }}
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
                Submitted {moment(post.timestamp).fromNow()} on{" "}
                {moment(post.timestamp).format("MMM Do, YYYY [at] hh:mm a")} by{" "}
                <span className="text-bold">{post.author}</span>
              </div>
              <Link className="chip" to={`/${post.category}`}>
                {post.category}
              </Link>
            </div>
            <div>
              <div className="card-body">{detailView && post.body}</div>
              <div className="card-footer">
                {!detailView && (
                  <div className="label m-1">
                    <i className="icon icon-message" />{" "}
                    {comments && comments.length} Comments
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="container">
          {detailView && <CommentSection postId={post.id} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ comments, posts }, ownProps) {
  const postId = ownProps.postId || ownProps.match.params.postId;
  return {
    comments: comments[postId],
    posts: posts.items.filter(post => post.id === postId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: data => dispatch(getComments(data)),
    getPost: data => dispatch(getPost(data)),
    removePost: data => dispatch(removePost(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
