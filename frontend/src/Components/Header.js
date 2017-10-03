import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header className="navbar m-2">
        <section className="navbar-section">
          <a className="navbar-brand mr-2">Readable</a>
          <a className="btn btn-link">Categories</a>
        </section>
        <section className="navbar-section">
          <div className="input-group input-inline">
            <input className="form-input" type="text" placeholder="search" />
            <button className="btn btn-primary input-group-btn">Search</button>
          </div>
        </section>
      </header>
    );
  }
}
