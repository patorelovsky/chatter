import { useGetCommentsQuery } from "../redux";
import type { Comment as CommentType } from "../types";
import Comment from "./Comment";

type Props = Pick<CommentType, "parentId" | "parentType">;

export default function CommentList({ parentId, parentType }: Props) {
  const { isFetching, isError, data } = useGetCommentsQuery({
    parentId,
    parentType,
    _page: 1,
    _per_page: 10,
  });

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
      <h2 className="font-medium">Comments</h2>
      <div>{getContent()}</div>
    </div>
  );
}
