import { useDeletePostMutation } from "../redux";
import { Post } from "../types/Post";
import Accordion from "./Accordion";
import CommentList from "./CommentList";
import Divider from "./Divider";
import ImageList from "./ImageList";

type Props = {
  post: Post;
};

export default function Post({ post }: Props) {
  const [deletePost, result] = useDeletePostMutation();

  function handleDeleteClick() {
    deletePost(post);
  }

  return (
    <div className="mb-2">
      <div className="flex w-64 justify-between">
        <p>{post.text}</p>
        <button
          type="button"
          disabled={result.isLoading}
          onClick={handleDeleteClick}
          title="Delete"
        >
          X
        </button>
      </div>
      <ImageList parentId={post.id} parentType="post" />
      <Divider />
      <Accordion title="Comments">
        <CommentList parentId={post.id} parentType="post" />
      </Accordion>
    </div>
  );
}
