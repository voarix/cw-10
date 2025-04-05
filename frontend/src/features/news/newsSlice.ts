import { INews } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllNews } from "./newsThunks.ts";
import { RootState } from "../../app/store.ts";

interface NewsState {
  items: INews[];
  fetchLoading: boolean;
  createLoading: boolean;
  error: boolean;
}

const initialState: NewsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
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
        state.items = news;
        state.fetchLoading = false;
      })
      .addCase(fetchAllNews.rejected, (state) => {
        state.fetchLoading = true;
      });
  },
});

export const newsReducer = newsSlice.reducer;

export const selectNews = (state: RootState) => state.news.items;
export const selectNewsLoading = (state: RootState) => state.news.fetchLoading;
export const selectError = (state: RootState) => state.news.error;
