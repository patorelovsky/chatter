import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../../types";

const PER_PAGE = 10;

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<Post[], number>({
      query: (page = 1) => `./posts?_page=${page}&_per_page=${PER_PAGE}`,
      transformResponse: ({ data }: { data: Post[] }) => data,
    }),
  }),
});

export const { useFetchPostsQuery } = postApi;