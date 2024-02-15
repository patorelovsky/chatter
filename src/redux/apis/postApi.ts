import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../../types";

type GetPostsArgs = {
  _page: number;
  _per_page: number;
};

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], GetPostsArgs>({
      query: (params) => ({
        url: `/posts`,
        params,
      }),
      transformResponse: ({ data }: { data: Post[] }) => data,
      providesTags(results) {
        const tags = [];

        tags.push({ type: "Post" as const });
        if (results) {
          tags.push(
            ...results.map(({ id }) => ({ type: "Post" as const, id }))
          );
        }

        return tags;
      },
    }),
    createPost: builder.mutation<Post, Omit<Post, "id">>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
    deletePost: builder.mutation<void, Pick<Post, "id">>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_results, _error, args) => [
        { type: "Post", id: args.id },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;
