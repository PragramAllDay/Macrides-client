import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "RentalServiceType",
  initialState: {
    value: {},
  },
  reducers: {
    setRentalServiceType: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
    resetForm: (state) => {
      state.value = {};
    },
  },
});

export const { setRentalServiceType } = userSlice.actions;

export default userSlice.reducer;
