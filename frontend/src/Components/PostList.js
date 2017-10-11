import React, { Component } from "react";
// import * as ReadableAPI from "../Util/readable-api";
import Post from "./Post";
import CategoryList from "./CategoryList";
import sortBy from "sort-by";
import { connect } from "react-redux";
import { getPosts } from "../Actions";

class PostList extends Component {
  state = {
    sort: null
  };
  componentDidMount() {
    const { params } = this.props.match;
    this.props.getPosts(params.category);
    // this.props.subscribe(() => {
    //   store.getState();
    //   this.setState({
    //     sort:
    //   })
    // });
  }

  render() {
    const { posts, category, sort } = this.props;
    return (
      <div className="columns">
        <div className="column col-9">
          {posts &&
            posts.length > 0 &&
            posts
              .sort(sortBy(sort))
              .map(post => (
                <Post key={post.id} postId={post.id} detailView={false} />
              ))}
        </div>
        <CategoryList selected={category} />
      </div>
    );
  }
}

function mapStateToProps({ posts, sort, category }) {
  return {
    posts,
    sort,
    category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: data => dispatch(getPosts(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
