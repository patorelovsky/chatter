import { useState } from "react";
import { useGetCommentsQuery } from "../redux";
import type { Comment as CommentType } from "../types";
import Comment from "./Comment";
import Divider from "./Divider";
import NewCommentForm from "./NewCommentForm";

type Props = Pick<CommentType, "parentId" | "parentType">;

export default function CommentList({ parentId, parentType }: Props) {
  const [showForm, setShowForm] = useState(false);
  const { isFetching, isError, data } = useGetCommentsQuery({
    parentId,
    parentType,
    _page: 1,
    _per_page: 10,
  });

  function getContent() {
    if (isFetching) {
      return <p>Loading comments...</p>;
    } else if (isError) {
      return <p>Error loading comments.</p>;
    } else {
      return data?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ));
    }
  }

  return (
    <div>
      {showForm ? (
        <NewCommentForm
          handleOnReset={() => setShowForm(false)}
          parentId={parentId}
          parentType={parentType}
        />
      ) : (
        <h2
          onClick={() => setShowForm(true)}
          className="cursor-pointer text-blue-800 underline"
        >
          New Comment
        </h2>
      )}
      <Divider />
      <div>{getContent()}</div>
    </div>
  );
}
