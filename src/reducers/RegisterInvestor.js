import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "register",
  initialState: {
    value: {
      role: "3",
    },
  },
  reducers: {
    setRegister: (state, action) => {
      // console.log("action.payload", action.payload);
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

export const { setRegister, resetForm } = userSlice.actions;

export default userSlice.reducer;
