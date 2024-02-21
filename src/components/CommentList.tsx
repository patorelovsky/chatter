import { useState } from "react";
import { useGetCommentsQuery } from "../redux";
import type { Comment as CommentType } from "../types";
import Comment from "./Comment";
import Divider from "./Divider";
import NewCommentForm from "./NewCommentForm";

type Props = Pick<CommentType, "parentId" | "parentType">;

export default function CommentList({ parentId, parentType }: Props) {
  const [showComments, setShowComments] = useState(false);
  const { isFetching, isError, data } = useGetCommentsQuery({
    parentId,
    parentType,
    _page: 1,
    _per_page: 10,
  });

  function handleHeadingClick() {
    setShowComments((oldVal) => !oldVal);
  }

  function getContent() {
    if (isFetching) {
      return <p>Loading...</p>;
    } else if (isError) {
      return <p>Error loading comments.</p>;
    } else {
      return data?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ));
    }
  }

  return (
    <div className="ml-2">
      <div className="flex cursor-pointer" onClick={handleHeadingClick}>
        <p className="mr-2">{showComments ? "˅" : ">"}</p>
        <h2 className="font-medium">Comments</h2>
      </div>
      {showComments && (
        <>
          <NewCommentForm parentId={parentId} parentType={parentType} />
          <Divider />
          <div>{getContent()}</div>
        </>
      )}
    </div>
  );
}
