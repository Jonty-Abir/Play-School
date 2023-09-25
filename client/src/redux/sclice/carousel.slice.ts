import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCarousel } from "../../helper/helper";

export interface CarouselState {
  isLoading: boolean;
  isError: boolean;
  carousel: [];
}

const initialState: CarouselState = {
  isError: false,
  isLoading: false,
  carousel: [],
};

// Create Thank
export const showCarousel = createAsyncThunk("getAll-carousel", async () => {
  const data = await getAllCarousel();
  return data;
});

const carouselSclice = createSlice({
  name: "carouselSclice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(showCarousel.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(showCarousel.fulfilled, (status, { payload }) => {
      status.isLoading = false;
      status.carousel = payload;
    });
    builder.addCase(showCarousel.rejected, (status) => {
      status.isError = true;
      status.carousel = [];
    });
  },
});

export default carouselSclice.reducer;
