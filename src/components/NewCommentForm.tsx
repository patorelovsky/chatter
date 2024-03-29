import { useCreateCommentMutation } from "../redux";
import { TextObject } from "../types";
import TextWithImagesForm from "./TextWithImagesForm";

type Props = {
  parentId: number;
  parentType: "post" | "comment";
  handleOnReset?: () => void;
};

export default function NewCommentForm({
  parentId,
  parentType,
  handleOnReset,
}: Props) {
  const [createComment, createCommentResult] = useCreateCommentMutation();

  async function createParent({ text }: TextObject) {
    return await createComment({
      text,
      parentId,
      parentType,
    }).unwrap();
  }

  return (
    <TextWithImagesForm
      createParent={createParent}
      isLoading={createCommentResult.isLoading}
      parentType="comment"
      handleOnReset={handleOnReset}
    />
  );
}
