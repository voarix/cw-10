import { createAsyncThunk } from "@reduxjs/toolkit";
import { IComment, ICommentMutation } from "../../types";
import axiosAPI from "../../axiosApi.ts";

export const fetchAllComments = createAsyncThunk<IComment[], void>(
  "news/fetchAllComments",
  async () => {
    const response = await axiosAPI.get<IComment[]>("/comments");
    return response.data;
  },
);

export const createComment = createAsyncThunk<void, ICommentMutation>(
  "comments/createComment",
  async (newComment) => {
    await axiosAPI.post<IComment>("/comments", newComment);
  },
);

export const deleteComment = createAsyncThunk<void, number>(
  "comments/deleteComment",
  async (comment_id) => {
    await axiosAPI.delete(`/comments/${comment_id}`);
  },
);
