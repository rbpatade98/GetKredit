import { configureStore } from "@reduxjs/toolkit";
import recycleBinReducer from "./slices/recycleBinSlice";
import reportDetailsReducer from "./slices/reportDetailsSlice";

export const store = configureStore({
  reducer: {
    recycleBin: recycleBinReducer,
    reportDetails: reportDetailsReducer,
  },
});
