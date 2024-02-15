import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Comment } from "../../types";

type GetCommentsArgs = Pick<Comment, "parentId" | "parentType"> & {
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
      providesTags(results, _error, args) {
        const tags = [];

        tags.push({
          type:
            args.parentType === "post"
              ? ("Post" as const)
              : ("Comment" as const),
          id: args.parentId,
        });

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
      invalidatesTags(_result, _error, args) {
        const tags = [];

        tags.push({
          type:
            args.parentType === "post"
              ? ("Post" as const)
              : ("Comment" as const),
          id: args.parentId,
        });

        return tags;
      },
    }),
    deleteComment: builder.mutation<
      void,
      Pick<Comment, "id" | "parentId" | "parentType">
    >({
      query: ({ id }) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, args) {
        const tags = [];

        tags.push({ type: "Comment" as const, id: args.id });

        tags.push({
          type:
            args.parentType === "post"
              ? ("Post" as const)
              : ("Comment" as const),
          id: args.parentId,
        });

        return tags;
      },
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
