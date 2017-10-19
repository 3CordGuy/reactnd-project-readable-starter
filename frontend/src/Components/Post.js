import React, { Component } from "react";
import CommentSection from "./CommentSection";
import { Link, withRouter } from "react-router-dom";
import VoteButtons from "./VoteButtons";
import EditControls from "./EditControls";
import { connect } from "react-redux";
import {
  getPost,
  removePost,
  upVotePost,
  downVotePost
} from "../Actions/posts";
import { openModal } from "../Actions/modal";
import { getComments } from "../Actions/comments";
import { setSort } from "../Actions/sort";
import moment from "moment";

class Post extends Component {
  componentDidMount() {
    const { getComments, getPost, posts, match } = this.props;
    const reduxPost = posts && posts.length && posts[0];
    const routePostId = match && match.params && match.params.postId;

    // Is post loaded in redux state? Don't fetch...
    if (reduxPost && reduxPost.id) {
      getComments(reduxPost.id);
    } else {
      getPost(routePostId);
      getComments(routePostId);
    }
  }

  render() {
    const { posts, detailView, comments, sort, isFetching } = this.props;
    const post = posts.length && posts[0];

    return (
      <div>
        {isFetching ? (
          <div className="loading loading-lg" />
        ) : (
          post && (
            <div className="card bg-gray m-2">
              <div className="card-header">
                <div>
                  {detailView && (
                    <span className="float-right">
                      <EditControls
                        isPrimary={true}
                        label="POST CONTROLS"
                        onEditHandler={() => this.props.openModal(post)}
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
                    onUpVote={this.props.upVotePost}
                    onDownVote={this.props.downVotePost}
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
                  {moment(post.timestamp).format(
                    "MMM Do, YYYY [at] hh:mm a"
                  )}{" "}
                  by <span className="text-bold">{post.author}</span>
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
          )
        )}
        <div className="container" style={{ marginBottom: 20 }}>
          {detailView && (
            <CommentSection
              postId={post.id}
              sort={sort}
              onSortClick={this.props.setSort}
              comments={comments}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ comments, posts, sort }, ownProps) {
  const postId = ownProps.postId || ownProps.match.params.postId;
  return {
    comments: comments[postId],
    sort,
    isFetching: posts.isFetching,
    posts: posts.items.filter(post => post.id === postId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSort: data => dispatch(setSort(data)),
    upVotePost: data => dispatch(upVotePost(data)),
    downVotePost: data => dispatch(downVotePost(data)),
    getComments: data => dispatch(getComments(data)),
    getPost: data => dispatch(getPost(data)),
    removePost: data => dispatch(removePost(data)),
    openModal: data => dispatch(openModal(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
