import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Comment } from "../../types";

type GetCommentsArgs = Pick<Comment, "postId"> & {
  _page: number;
  _per_page: number;
};

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Comment", "Post"],
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], GetCommentsArgs>({
      query: (params) => ({
        url: `/comments`,
        params,
      }),
      transformResponse: ({ data }: { data: Comment[] }) => data,
      providesTags(results, _error, args) {
        const tags = [];

        tags.push({ type: "Post" as const, id: args.postId });

        if (results) {
          tags.push(
            ...results.map((r) => ({ type: "Comment" as const, id: r.id }))
          );
        }

        return tags;
      },
    }),
    createComment: builder.mutation<Comment, Omit<Comment, "id">>({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: (_results, _error, args) => [
        { type: "Post", id: args.postId },
      ],
    }),
    deleteComment: builder.mutation<void, Pick<Comment, "id" | "postId">>({
      query: ({ id }) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, args) => [
        { type: "Comment", id: args.id },
        { type: "Post", id: args.postId },
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
