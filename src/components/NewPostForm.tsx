import { useCreatePostMutation } from "../redux";
import { TextObject } from "../types";
import TextWithImagesForm from "./TextWithImagesForm";

export default function NewPostForm() {
  const [createPost, createPostResult] = useCreatePostMutation();

  async function createParent({ text }: TextObject) {
    return await createPost({ text }).unwrap();
  }

  return (
    <TextWithImagesForm
      createParent={createParent}
      isLoading={createPostResult.isLoading}
      parentType="post"
    />
  );
}
