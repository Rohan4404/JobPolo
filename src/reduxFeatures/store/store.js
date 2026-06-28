import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counterSlice";
import userReducer from "../slice/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
