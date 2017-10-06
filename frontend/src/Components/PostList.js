import React, { Component } from "react";
import * as ReadableAPI from "../Util/readable-api";
import PostListItem from "./PostListItem";
import sortBy from "sort-by";

export default class PostList extends Component {
  state = {
    sort: "-voteScore",
    loading: false,
    posts: []
  };
  componentDidMount() {
    // Start Spinner
    this.setState({ loading: true });
    const { params } = this.props.match;
    if (params.category) {
      ReadableAPI.getPostsByCategory(params.category).then(posts => {
        this.setState({
          posts,
          loading: false
        });
      });
    } else {
      ReadableAPI.getPosts().then(posts => {
        this.setState({
          posts,
          loading: false
        });
      });
    }
  }
  render() {
    const { posts } = this.state;
    return (
      <div>
        {posts &&
          posts.length > 0 &&
          posts
            .sort(sortBy("-voteScore", "-timestamp"))
            .map(post => <PostListItem key={post.id} post={post} />)}
      </div>
    );
  }
}
