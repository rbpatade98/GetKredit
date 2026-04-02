import { configureStore } from "@reduxjs/toolkit";
import recycleBinReducer from "./slices/recycleBinSlice";
import reportDetailsReducer from "./slices/reportDetailsSlice";
import todoReducer from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    recycleBin: recycleBinReducer,
    reportDetails: reportDetailsReducer,
    todo: todoReducer,
  },
});

