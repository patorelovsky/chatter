import { Comment } from "../types";

type Props = {
  comment: Comment;
};
export default function Comment({ comment }: Props) {
  return <div>{comment.text}</div>;
}
