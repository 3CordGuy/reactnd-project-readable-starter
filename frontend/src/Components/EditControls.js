import React, { Component } from "react";

export default class PostControls extends Component {
  render() {
    const {
      isPrimary = false,
      label = "POST CONTROLS",
      onDeleteHandler,
      onEditHandler
    } = this.props;
    return (
      <div className="dropdown dropdown-right mx-2 float-right">
        <div className="btn-group">
          <button
            className={`btn dropdown-toggle ${isPrimary && "btn-primary"}`}
            tabIndex="0"
          >
            <i className="icon icon-menu" />
          </button>
          <ul className="menu">
            <li className="divider" data-content={label} />
            <li className="menu-item">
              <a className="c-hand" onClick={onEditHandler}>
                Edit
              </a>
            </li>
            <li className="menu-item">
              <a className="c-hand" onClick={onDeleteHandler}>
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
