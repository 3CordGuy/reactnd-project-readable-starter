import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ReadableAPI from "../Util/readable-api";

export default class PostListItem extends Component {
  state = {
    categories: [],
    loading: false
  };

  componentDidMount() {
    // Start Spinner
    this.setState({ loading: true });

    ReadableAPI.getCategories().then(response => {
      this.setState({
        categories: response.categories,
        loading: false
      });
    });
  }

  render() {
    const { categories } = this.state;
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
                  this.props.selected === c.name ? (
                    "nav-item active"
                  ) : (
                    "nav-item"
                  )
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
