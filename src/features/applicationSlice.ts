import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    }
  }
});

export const selectIsModalOpen = (state: any) => state.application && state.application.isModalOpen;

export const {
  setIsModalOpen,
} = applicationSlice.actions;

export default applicationSlice.reducer;