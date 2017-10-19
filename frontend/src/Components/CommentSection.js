import React from "react";
import Comment from "./Comment";
import CommentAddForm from "./CommentAddForm";
import sortBy from "sort-by";

export default function CommentSection({
  comments,
  postId,
  sort,
  onSortClick
}) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title h5">Add a Comment</div>
      </div>
      <div className="card-body">
        <CommentAddForm postId={postId} />
      </div>
      <div className="card-footer">
        <h6>
          {comments && comments.length} Comments{" "}
          <span style={{ fontSize: "0.8em", opacity: "0.8" }}>
            Sorted by{" "}
            <a
              className="c-hand"
              onClick={() => {
                if (sort === "-voteScore") {
                  return onSortClick("-timestamp");
                }
                return onSortClick("-voteScore");
              }}
            >
              {sort === "-voteScore" ? "Score" : "Date"}
            </a>
          </span>
        </h6>
        {comments &&
          comments
            .sort(sortBy(sort))
            .map(comment => <Comment key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
}
