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
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation<Comment, Omit<Comment, "id">>({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
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
