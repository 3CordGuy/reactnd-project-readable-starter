import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Components/Header";
import PostList from "./Components/PostList";
import Post from "./Components/Post";
import Modal from "./Components/Modal";
import "./spectre.min.css";
import "./spectre-icons.min.css";

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
