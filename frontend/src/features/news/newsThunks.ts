import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import { INews, INewsMutation } from "../../types";

export const fetchAllNews = createAsyncThunk<INews[], void>(
  "news/fetchAllNews",
  async () => {
    const response = await axiosAPI.get<INews[]>("/news");
    return response.data;
  },
);

export const fetchNewsById = createAsyncThunk<INews, string>(
  "news/fetchNewsById",
  async (news_id) => {
    const response = await axiosAPI.get<INews>("/news/" + news_id);
    return response.data || null;
  },
);

export const createNews = createAsyncThunk<void, INewsMutation>(
  "news/createNews",
  async (productToAdd) => {
    const formData = new FormData();
    const keys = Object.keys(productToAdd) as (keyof INewsMutation)[];

    keys.forEach((key) => {
      const value = productToAdd[key] as string;
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosAPI.post("/news", formData);
  },
);

export const deleteOneNews = createAsyncThunk<void, string>(
  "news/deleteOneNews",
  async (news_id) => {
    await axiosAPI.delete(`/news/${news_id}`);
  },
);
