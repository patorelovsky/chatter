import { useDeleteCommentMutation } from "../redux";
import type { Comment } from "../types";
import CommentList from "./CommentList";
import ImageList from "./ImageList";

type Props = {
  comment: Comment;
};

export default function Comment({ comment }: Props) {
  const [deleteComment, result] = useDeleteCommentMutation();

  function handleDeleteClick() {
    deleteComment(comment);
  }

  return (
    <div>
      <div className="flex w-64 justify-between">
        <p>{comment.text}</p>
        <button
          type="button"
          disabled={result.isLoading}
          onClick={handleDeleteClick}
          title="Delete"
        >
          X
        </button>
      </div>
      <ImageList parentId={comment.id} parentType="comment" />
      <CommentList parentId={comment.id} parentType="comment" />
    </div>
  );
}
