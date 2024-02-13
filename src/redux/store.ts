import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "./apis/postApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { imageApi } from "./apis/imageApi";

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([postApi.middleware, imageApi.middleware]),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
