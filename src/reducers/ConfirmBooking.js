import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "confirmBooking",
  initialState: {
    value: {},
  },
  reducers: {
    setConfirmBooking: (state, action) => {
      state.value = {
        ...action.payload,
      };
    },
  },
});

export const { setConfirmBooking } = userSlice.actions;

export default userSlice.reducer;
