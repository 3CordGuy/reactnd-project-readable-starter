import React, { Component } from "react";

export default class SortDropdown extends Component {
  render() {
    const { currentSort } = this.props;
    return (
      <div className="dropdown mx-2">
        <div className="btn-group">
          <button className="btn dropdown-toggle" tabIndex="0">
            <i className="icon icon-caret" />
          </button>
          <ul className="menu">
            <li className="divider" data-content="SORT" />
            <li
              className={`menu-item ${currentSort === "-timestamp" &&
                "bg-secondary"}`}
            >
              <a className="c-hand">By Date</a>
            </li>
            <li
              className={`menu-item ${currentSort === "-voteScore" &&
                "bg-secondary"}`}
            >
              <a className="c-hand">By Score</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
