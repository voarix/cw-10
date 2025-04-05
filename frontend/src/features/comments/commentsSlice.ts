import { IComment } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  deleteComment,
  fetchAllComments,
} from "./commentsThunks.ts";
import { RootState } from "../../app/store.ts";

interface CommentState {
  items: IComment[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  error: boolean;
}

const initialState: CommentState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  error: false,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComments.pending, (state) => {
        state.fetchLoading = true;
        state.error = false;
      })
      .addCase(fetchAllComments.fulfilled, (state, { payload: comments }) => {
        state.items = [...comments].reverse();
        state.fetchLoading = false;
      })
      .addCase(fetchAllComments.rejected, (state) => {
        state.fetchLoading = false;
        state.error = true;
      })

      .addCase(createComment.pending, (state) => {
        state.createLoading = true;
        state.error = false;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.createLoading = false;
        state.error = true;
      })

      .addCase(deleteComment.pending, (state) => {
        state.deleteLoading = true;
        state.error = false;
      })
      .addCase(deleteComment.fulfilled, (state, { meta: arg }) => {
        state.items = state.items.filter(
          (comment) => comment.id !== Number(arg),
        );
        state.deleteLoading = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deleteLoading = false;
        state.error = true;
      });
  },
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoading = (state: RootState) =>
  state.comments.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
  state.comments.createLoading;
