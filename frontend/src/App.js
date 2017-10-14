import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Components/Header";
import PostList from "./Components/PostList";
import Post from "./Components/Post";
import AddPost from "./Components/AddPost";
import Modal from "./Components/Modal";
import "./App.css";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.min.css";

class App extends Component {
  render() {
    return (
      <div className="container grid-lg">
        <Modal {...this.props} />
        <Header {...this.props} />
        <Route exact path="/" render={props => <PostList {...props} />} />
        <Route
          exact
          path="/:category"
          component={props => <PostList {...props} />}
        />
        <Route
          exact
          path="/:category/:postId"
          component={props => <Post {...props} detailView={true} />}
        />
      </div>
    );
  }
}

export default App;
