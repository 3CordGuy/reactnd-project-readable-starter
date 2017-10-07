import React, { Component } from "react";
import * as ReadableAPI from "../Util/readable-api";
import PostListItem from "./PostListItem";
import CategoryList from "./CategoryList";
import sortBy from "sort-by";

export default class PostList extends Component {
  state = {
    category: this.props.match.params.category,
    sort: "-voteScore",
    loading: false,
    posts: []
  };
  componentDidMount() {
    const { params } = this.props.match;
    const { category } = this.state;
    this.setState({ loading: true, category: params.category });

    if (category) {
      ReadableAPI.getPostsByCategory(category).then(posts => {
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
      <div className="columns">
        <div className="column col-9">
          {posts &&
            posts.length > 0 &&
            posts
              .sort(sortBy("-voteScore", "-timestamp"))
              .map(post => <PostListItem key={post.id} post={post} />)}
        </div>
        <CategoryList />
      </div>
    );
  }
}
