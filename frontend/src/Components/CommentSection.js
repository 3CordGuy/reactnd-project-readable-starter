import React from "react";
import Comment from "./Comment";
import CommentAddForm from "./CommentAddForm";
import sortBy from "sort-by";

export default function CommentSection({ comments, postId, sort }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Add a Comment</div>
      </div>
      <div className="card-body">
        <CommentAddForm postId={postId} />
      </div>
      <div className="card-footer">
        <h6>{comments && comments.length} Comments</h6>
        {comments &&
          comments
            .sort(sortBy(sort))
            .map(comment => <Comment key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
}
