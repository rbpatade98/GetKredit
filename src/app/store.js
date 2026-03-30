import { configureStore } from "@reduxjs/toolkit";
// import recycleBinReducer from "../features/recycleBin/recycleBinSlice";
// import reportsReducer from "../features/reports/reportsSlice";

export const store = configureStore({
  reducer: {
    // recycleBin: recycleBinReducer,
    // reports: reportsReducer,
  },
});