import React, { Component } from "react";
import * as ReadableAPI from "./Util/readable-api";
// import { Route } from "react-router-dom";
import Header from "./Components/Header";
import PostList from "./Components/PostList";
import "./App.css";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.min.css";

class App extends Component {
  state = {
    loading: false,
    posts: [],
    categories: []
  };

  componentDidMount() {
    // Start Spinner
    this.setState({ loading: true });
    ReadableAPI.getPosts().then(posts => {
      console.log(posts);
      this.setState({
        posts,
        loading: false
      });
    });
  }

  render() {
    return (
      <div className="container grid-lg">
        <Header />
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
