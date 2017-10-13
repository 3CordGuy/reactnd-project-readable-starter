import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCategories } from "../Actions/categories";

class CategoryList extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories } = this.props;
    return (
      <div className="column col-3">
        <ul className="nav">
          <li className="divider" data-content="CATEGORIES" />
          <li className={!this.props.selected ? "nav-item active" : "nav-item"}>
            <Link to="/">All</Link>
          </li>
          {categories &&
            categories.map(c => (
              <li
                className={
                  this.props.selected === c.name
                    ? "nav-item active"
                    : "nav-item"
                }
                key={c.name}
              >
                <Link to={`/${c.path}`}>{c.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories.items
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: data => dispatch(getCategories(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
