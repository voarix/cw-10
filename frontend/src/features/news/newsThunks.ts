import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import { INews } from "../../types";

export const fetchAllNews = createAsyncThunk<INews[], void>(
  "news/fetchAllNews",
  async () => {
    const response = await axiosAPI.get<INews[]>("/news");
    return response.data;
  },
);
