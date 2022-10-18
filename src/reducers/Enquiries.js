import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "enquiries",
  initialState: {
    value: {},
  },
  reducers: {
    setEnquiries: (state, action) => {
      state.value = {
        ...action.payload,
      };
    },
  },
});

export const { setEnquiries } = userSlice.actions;

export default userSlice.reducer;
