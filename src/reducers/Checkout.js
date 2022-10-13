import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "bookedCar",
  initialState: {
    value: {},
  },
  reducers: {
    setBookedCar: (state, action) => {
      state.value = {
        ...action.payload,
      };
    },
  },
});

export const { setBookedCar } = userSlice.actions;

export default userSlice.reducer;
