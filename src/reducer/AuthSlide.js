import { createSlice } from "@reduxjs/toolkit";

const authSlide = createSlice({
  name: "authSlide",
  initialState: {
    auth: {},
  },
  reducers: {
    setAuth: (state, action) => {
      return {
        ...state,
        auth: action.payload
      };
    },
  },
});

const { reducer, actions } = authSlide;
export const { setAuth } = actions;
export default reducer;
