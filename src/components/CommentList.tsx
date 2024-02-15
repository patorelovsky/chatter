import { useGetCommentsQuery } from "../redux";
import type { Post } from "../types";
import Comment from "./Comment";

type Props = {
  post: Post;
};

export default function CommentList({ post }: Props) {
  const { isFetching, isError, data } = useGetCommentsQuery({
    postId: post.id,
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
