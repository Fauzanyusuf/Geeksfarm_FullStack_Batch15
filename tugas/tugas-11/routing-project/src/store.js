import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./utils/counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
