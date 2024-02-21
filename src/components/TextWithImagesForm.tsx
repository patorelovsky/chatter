import { useEffect } from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import { useCreateImageMutation } from "../redux";
import { Image, TextObject } from "../types";
import { fileToBase64 } from "../utils";
import FilePicker from "./FilePicker";

type Inputs = {
  text: string;
  files: FileList;
};

const textInputRegisterOptions: RegisterOptions<Inputs, "text"> = {
  required: {
    value: true,
    message: "Text cannot be empty!",
  },
  minLength: {
    value: 1,
    message: "Min length of text is 10 characters.",
  },
  maxLength: {
    value: 100,
    message: "Max length of text is 100 characters.",
  },
};

type Props = {
  createParent: (text: TextObject) => Promise<{ id: number }>;
  isLoading: boolean;
  parentType: "post" | "comment";
};

export default function TextWithImagesForm({
  createParent,
  isLoading,
  parentType,
}: Props) {
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

  const [createImage] = useCreateImageMutation();

  async function onSubmit({ text, files }: Inputs) {
    const { id } = await createParent({ text });
    await createImages(files, id);
  }

  async function createImages(files: FileList, parentId: number) {
    const filesArray = Array.from(files);
    const filesBase64Promises = filesArray.map((file) => fileToBase64(file));
    const filesBase64 = await Promise.all(filesBase64Promises);
    const images: Omit<Image, "id">[] = filesBase64.map((fileBase64) => ({
      url: fileBase64,
      parentId,
      parentType,
    }));
    for (const image of images) {
      createImage(image);
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center">
        <input
          disabled={isLoading}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Enter text..."
          {...register("text", textInputRegisterOptions)}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Save
        </button>
        <button
          className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
          type="reset"
        >
          Cancel
        </button>
      </div>
      <div className="container flex space-x-2">
        <FilePicker {...register("files")} disabled={isLoading} />
      </div>
      {errors.text && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">{errors.text.message}</span>{" "}
        </div>
      )}
    </form>
  );
}
