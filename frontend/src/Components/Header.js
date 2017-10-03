import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header className="navbar m-2">
        <section className="navbar-section">
          <a className="navbar-brand text-large mr-2">
            <i className="icon icon-message" /> Readable
          </a>
        </section>
        <section className="navbar-section">
          <button className="btn btn-primary input-group-btn">
            <i className="icon icon-plus" /> Create Post
          </button>
        </section>
      </header>
    );
  }
}
