import React, { Component } from "react";

export default class EditControls extends Component {
  state = {
    showConfirm: false
  };

  onDelete = () => {
    this.setState({
      showConfirm: true
    });
  };

  onCancelConfirm = () => {
    this.setState({
      showConfirm: false
    });
  };

  onConfirmDelete = () => {};

  render() {
    const {
      isPrimary = false,
      label = "POST CONTROLS",
      onEditHandler,
      onDeleteHandler
    } = this.props;
    return (
      <div className="dropdown dropdown-right mx-2 float-right">
        <div className="btn-group">
          <button
            className={`btn dropdown-toggle ${isPrimary && "btn-primary"}`}
            tabIndex="0"
            onMouseOver={this.onCancelConfirm}
          >
            <i className="icon icon-menu" />
          </button>

          {this.state.showConfirm ? (
            <ul className="menu">
              <li className="divider" data-content="ARE YOU SURE?" />
              <li className="menu-item">
                <a className="c-hand " onClick={onDeleteHandler}>
                  <span className="text-error">Confirm</span>
                </a>
              </li>
              <li className="menu-item">
                <a className="c-hand" onClick={this.onCancelConfirm}>
                  Cancel
                </a>
              </li>
            </ul>
          ) : (
            <ul className="menu">
              <li className="divider" data-content={label} />
              <li className="menu-item">
                <a className="c-hand" onClick={onEditHandler}>
                  Edit
                </a>
              </li>
              <li className="menu-item">
                <a className="c-hand" onClick={this.onDelete}>
                  Delete
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}
