import { useForm } from "react-hook-form";

type Inputs = {
  title: string;
};

export default function PostForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  function onSubmit({ title }: Inputs) {
    console.log(title);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Enter text..."
          {...register("title", {
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
          })}
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
