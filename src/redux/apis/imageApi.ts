import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Image } from "../../types";

type GetImagesArgs = Pick<Image, "parentId" | "parentType"> & {
  _page: number;
  _per_page: number;
};

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Image", "Post", "Comment"],
  endpoints: (builder) => ({
    getImages: builder.query<Image[], GetImagesArgs>({
      query: (params) => ({
        url: `/images`,
        params,
      }),
      transformResponse: ({ data }: { data: Image[] }) => data,
      providesTags: (results, _error, args) => {
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
            ...results.map((r) => ({ type: "Image" as const, id: r.id }))
          );
        }

        return tags;
      },
    }),
    createImage: builder.mutation<Image, Omit<Image, "id">>({
      query: (image) => ({
        url: "/images",
        method: "POST",
        body: image,
      }),
      invalidatesTags: (_result, _error, args) => {
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
    deleteImage: builder.mutation<
      void,
      Pick<Image, "id" | "parentId" | "parentType">
    >({
      query: ({ id }) => ({
        url: `/images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, args) => {
        const tags = [];

        tags.push({ type: "Image" as const, id: args.id });

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
  useGetImagesQuery,
  useCreateImageMutation,
  useDeleteImageMutation,
} = imageApi;
