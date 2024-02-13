import { useDeletePostMutation } from "../redux";
import { Post } from "../types/Post";

type Props = {
  post: Post;
};

export default function Post({ post }: Props) {
  const [deletePost, result] = useDeletePostMutation();

  function handleDeleteClick() {
    deletePost(post);
  }

  return (
    <div className="flex w-64 justify-between">
      <p>{post.title}</p>
      <button
        type="button"
        disabled={result.isLoading}
        onClick={handleDeleteClick}
        title="Delete"
      >
        X
      </button>
    </div>
  );
}
