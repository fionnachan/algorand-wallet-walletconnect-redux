import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setIsModalOpen } = applicationSlice.actions;

export default applicationSlice.reducer;
