import { useCreatePostMutation } from "../redux";
import { TextObject } from "../types";
import TextWithImagesForm from "./TextWithImagesForm";

type Props = {
  handleOnReset?: () => void;
};

export default function NewPostForm({ handleOnReset }: Props) {
  const [createPost, createPostResult] = useCreatePostMutation();

  async function createParent({ text }: TextObject) {
    return await createPost({ text }).unwrap();
  }

  return (
    <TextWithImagesForm
      createParent={createParent}
      isLoading={createPostResult.isLoading}
      parentType="post"
      handleOnReset={handleOnReset}
    />
  );
}
