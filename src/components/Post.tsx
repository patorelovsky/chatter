import { Post } from "../types/Post";

type Props = {
  post: Post;
};

export default function Post({ post }: Props) {
  return <div>{post.title}</div>;
}
