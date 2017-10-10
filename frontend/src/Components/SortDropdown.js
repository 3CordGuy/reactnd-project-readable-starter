import React, { Component } from "react";
import { setSort } from "../Actions";
import { connect } from "react-redux";

class SortDropdown extends Component {
  render() {
    const { sort } = this.props;
    console.log(this.props);
    return (
      <div className="dropdown mx-2">
        <div className="btn-group">
          <button className="btn dropdown-toggle" tabIndex="0">
            <i className="icon icon-caret" />
          </button>
          <ul className="menu">
            <li className="divider" data-content="SORT" />
            <li
              className={`menu-item ${sort === "-timestamp" && "bg-secondary"}`}
            >
              <a
                className="c-hand"
                onClick={() => this.props.setSort("-timestamp")}
              >
                By Date
              </a>
            </li>
            <li
              className={`menu-item ${sort === "-voteScore" && "bg-secondary"}`}
            >
              <a
                className="c-hand"
                onClick={() => this.props.setSort("-voteScore")}
              >
                By Score
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ sort }) {
  return {
    sort
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSort: sort => dispatch(setSort(sort))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortDropdown);
