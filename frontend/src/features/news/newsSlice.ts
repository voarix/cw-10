import { INews } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createNews,
  deleteOneNews,
  fetchAllNews,
  fetchNewsById,
} from "./newsThunks.ts";
import { RootState } from "../../app/store.ts";

interface NewsState {
  items: INews[];
  oneItem: INews | null;
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  error: boolean;
}

const initialState: NewsState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  error: false,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.fetchLoading = true;
        state.error = false;
      })
      .addCase(fetchAllNews.fulfilled, (state, { payload: news }) => {
        state.items = [...news].reverse();
        state.fetchLoading = false;
      })
      .addCase(fetchAllNews.rejected, (state) => {
        state.fetchLoading = false;
        state.error = true;
      })

      .addCase(fetchNewsById.pending, (state) => {
        state.fetchLoading = true;
        state.error = false;
      })
      .addCase(fetchNewsById.fulfilled, (state, { payload: news }) => {
        state.oneItem = news;
        state.fetchLoading = false;
      })
      .addCase(fetchNewsById.rejected, (state) => {
        state.fetchLoading = false;
        state.error = true;
      })

      .addCase(createNews.pending, (state) => {
        state.createLoading = true;
        state.error = false;
      })
      .addCase(createNews.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.createLoading = false;
        state.error = true;
      })

      .addCase(deleteOneNews.pending, (state) => {
        state.deleteLoading = true;
        state.error = false;
      })
      .addCase(deleteOneNews.fulfilled, (state, { meta: arg }) => {
        state.items = state.items.filter((item) => item.id !== Number(arg));
        state.deleteLoading = false;
      })
      .addCase(deleteOneNews.rejected, (state) => {
        state.deleteLoading = false;
        state.error = true;
      });
  },
});

export const newsReducer = newsSlice.reducer;

export const selectNews = (state: RootState) => state.news.items;
export const selectNewsLoading = (state: RootState) => state.news.fetchLoading;
export const selectOnePost = (state: RootState) => state.news.oneItem;
export const selectCreateLoading = (state: RootState) =>
  state.news.createLoading;
export const selectDeleteLoading = (state: RootState) =>
  state.news.deleteLoading;
export const selectError = (state: RootState) => state.news.error;
