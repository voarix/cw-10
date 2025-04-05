import { createAsyncThunk } from "@reduxjs/toolkit";
import { IComment } from "../../types";
import axiosAPI from "../../axiosApi.ts";

export const fetchAllComments = createAsyncThunk<IComment[], void>(
  "news/fetchAllComments",
  async () => {
    const response = await axiosAPI.get<IComment[]>("/comments");
    return response.data;
  },
);
