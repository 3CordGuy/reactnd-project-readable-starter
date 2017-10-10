import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Components/Header";
import PostList from "./Components/PostList";
import PostDetails from "./Components/PostDetails";
import AddPost from "./Components/AddPost";
import "./App.css";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.min.css";

class App extends Component {
  render() {
    return (
      <div className="container grid-lg">
        <Header {...this.props} />
        <Route exact path="/" render={props => <PostList {...props} />} />
        <Route exact path="/add" render={props => <AddPost {...props} />} />
        <Route
          exact
          path="/:category"
          render={props => <PostList {...props} />}
        />
        <Route
          exact
          path="/:category/:postId"
          render={props => <PostDetails {...props} />}
        />
      </div>
    );
  }
}

export default App;
