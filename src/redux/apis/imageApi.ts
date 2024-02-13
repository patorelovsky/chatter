import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Image } from "../../types";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getImages: builder.query<
      Image[],
      Partial<Image> & Pick<Image, "parentId" | "parentType">
    >({
      query: (params) => ({
        url: "/images",
        params,
      }),
    }),
  }),
});

export const { useGetImagesQuery } = imageApi;
