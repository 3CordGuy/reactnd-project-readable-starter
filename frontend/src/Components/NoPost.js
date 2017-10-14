import React from "react";

export default function NoPost({ category }) {
  return (
    <div className="card m-2">
      <div className="card-header">
        NO POSTS FOR CATEGORY {category && category.toUpperCase()}
      </div>
    </div>
  );
}
