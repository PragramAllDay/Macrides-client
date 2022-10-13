import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Dropoff",
  initialState: {
    value: {},
  },
  reducers: {
    setDropOff: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
  },
});

export const { setDropOff } = userSlice.actions;

export default userSlice.reducer;
