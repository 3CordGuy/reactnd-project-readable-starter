import React, { Component } from "react";
import PostListItem from "./PostListItem";
import sortBy from "sort-by";

export default class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div>
        {posts &&
          posts
            .sort(sortBy("-voteScore", "-timestamp"))
            .map(post => <PostListItem key={post.id} post={post} />)}
      </div>
    );
  }
}
