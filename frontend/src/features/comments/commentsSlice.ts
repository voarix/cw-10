import { IComment } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllComments } from "./commentsThunks.ts";
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
      });
  },
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoading = (state: RootState) =>
  state.comments.fetchLoading;
