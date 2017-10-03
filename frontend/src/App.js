import React, { Component } from "react";
import * as ReadableAPI from "./Util/readable-api";
import "./App.css";

class App extends Component {
  componentDidMount() {
    // Start Spinner
    this.setState({ loading: true });
    ReadableAPI.getPosts().then(posts => {
      console.log(posts);
      // this.setState({
      //   books,
      //   loading: false
      // });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
