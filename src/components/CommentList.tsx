import { Post } from "../types";

type Props = {
  post: Post;
};

export default function CommentList({ post }: Props) {
  return <div>CommentList for {post.id}</div>;
}
