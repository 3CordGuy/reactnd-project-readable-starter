import React from "react";

export default function NoPost({ category, onOpenModal }) {
  return (
    <div className="empty">
      <div className="empty-icon">
        <i className="icon icon-message" />
      </div>
      <p className="empty-title h5">
        There are no posts for this category ({category && category.toUpperCase()})
      </p>
      <p className="empty-subtitle">Click the button to create one.</p>
      <div className="empty-action">
        <button className="btn btn-primary" onClick={onOpenModal}>
          Create Post
        </button>
      </div>
    </div>
  );
}
