import { createSlice } from "@reduxjs/toolkit";

const authSlide = createSlice({
  name: "authSlide",
  initialState: {
    auth: {},
  },
  reducers: {
    setAuth: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const { reducer, actions } = authSlide;
export const { setAuth } = actions;
export default reducer;
