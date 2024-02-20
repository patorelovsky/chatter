import { RegisterOptions, useForm } from "react-hook-form";
import { useCreateImageMutation, useCreatePostMutation } from "../redux";
import { useEffect } from "react";
import { fileToBase64 } from "../utils";
import { Image, Post } from "../types";

type Inputs = {
  title: string;
  files: FileList;
};

const textInputRegisterOptions: RegisterOptions<Inputs, "title"> = {
  required: {
    value: true,
    message: "Text of the post cannot be empty!",
  },
  minLength: {
    value: 10,
    message: "Min length of post text is 10 characters.",
  },
  maxLength: {
    value: 100,
    message: "Max length of post text is 100 characters.",
  },
};

export default function NewPostForm() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const [createPost, createPostResult] = useCreatePostMutation();
  const [createImage] = useCreateImageMutation();

  async function onSubmit({ title, files }: Inputs) {
    const post = await createPost({ text: title }).unwrap();
    await createImages(files, post);
  }

  async function createImages(files: FileList, post: Post) {
    const filesArray = Array.from(files);
    const filesBase64Promises = filesArray.map((file) => fileToBase64(file));
    const filesBase64 = await Promise.all(filesBase64Promises);
    const images: Omit<Image, "id">[] = filesBase64.map((fileBase64) => ({
      url: fileBase64,
      parentId: post.id,
      parentType: "post",
    }));
    for (const image of images) {
      createImage(image);
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          disabled={createPostResult.isLoading}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Enter text..."
          {...register("title", textInputRegisterOptions)}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Post
        </button>
        <button
          className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
          type="reset"
        >
          Cancel
        </button>
      </div>
      <div className="container flex space-x-2">
        <input
          disabled={createPostResult.isLoading}
          type="file"
          id="img"
          accept="image/*"
          multiple
          {...register("files")}
        />
      </div>
      {errors.title && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">{errors.title.message}</span>{" "}
        </div>
      )}
    </form>
  );
}
