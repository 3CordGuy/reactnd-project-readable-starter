import React, { Component } from "react";
import Post from "./Post";
import CategoryList from "./CategoryList";
import NoPost from "./NoPost";
import sortBy from "sort-by";
import { connect } from "react-redux";
import { openModal } from "../Actions/modal";
import { getPosts, getCategoryPosts } from "../Actions/posts";

class PostList extends Component {
  state = {
    sort: null
  };

  componentDidMount() {
    const { params } = this.props.match;

    if (params && params.category) {
      this.props.getCategoryPosts(params.category);
    } else {
      this.props.getPosts();
    }
  }

  render() {
    const { posts, sort, isFetching } = this.props;
    const { category } = this.props.match.params;

    return (
      <div className="columns">
        <div className="column col-9">
          {isFetching ? (
            <div className="loading loading-lg" />
          ) : posts.length > 0 ? (
            posts
              .sort(sortBy(sort))
              .map(post => (
                <Post key={post.id} postId={post.id} detailView={false} />
              ))
          ) : (
            <NoPost category={category} onOpenModal={this.props.openModal} />
          )}
        </div>
        <CategoryList selected={category} />
      </div>
    );
  }
}

function mapStateToProps({ posts, sort }) {
  return {
    posts: posts.items,
    isFetching: posts.isFetching,
    sort
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: data => dispatch(getPosts(data)),
    getCategoryPosts: data => dispatch(getCategoryPosts(data)),
    openModal: data => dispatch(openModal(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
