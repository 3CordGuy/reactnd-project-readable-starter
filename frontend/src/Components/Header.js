import React, { Component } from "react";
import { Link } from "react-router-dom";
import SortDropdown from "./SortDropdown";

export default class Header extends Component {
  render() {
    return (
      <div>
        <header className="navbar m-2">
          <section className="navbar-section">
            <Link className="navbar-brand text-large mr-2" to="/">
              <i className="icon icon-message" /> Readable
            </Link>
          </section>
          <section className="navbar-section">
            <SortDropdown currentSort="-voteScore" />
            <Link className="btn btn-primary input-group-btn" to="/add">
              <i className="icon icon-plus" /> Create Post
            </Link>
          </section>
        </header>
      </div>
    );
  }
}
