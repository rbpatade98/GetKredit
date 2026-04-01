import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reportsMock } from "../../mock/reportDetailsMock";
import { getParsedReport } from "../parser/reportDetails.parser";

// Simulate an API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Async Thunk to fetch report details based on report ID.
 */
export const fetchReportDetails = createAsyncThunk(
  "reportDetails/fetchData",
  async (reportId, { rejectWithValue }) => {
    try {
      await delay(800);
      const report = reportsMock.find((r) => r.id === reportId);
      // Our new getParsedReport expects the entire report object
      const parsedReport = getParsedReport(report);
      // We return the rows to be stored in the state
      return parsedReport?.rows || [];
    } catch (err) {
      return rejectWithValue(err?.message || "Error loading report details");
    }
  }
);


/**
 * Async Thunk to simulate updating a specific row in the report.
 */
export const updateReportRow = createAsyncThunk(
  "reportDetails/updateRow",
  async (updatedRow, { rejectWithValue }) => {
    try {
      await delay(500);
      return updatedRow;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to update record");
    }
  }
);

const reportDetailsSlice = createSlice({
  name: "reportDetails",
  initialState: {
    rows: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearReportData: (state) => {
      state.rows = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Since the thunk now returns the rows array directly
        state.rows = action.payload || [];
      })
      .addCase(fetchReportDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || "Error fetching reports";
      })

      // Update
      .addCase(updateReportRow.fulfilled, (state, action) => {
        const index = state.rows?.findIndex((r) => r?.id === action.payload?.id);
        if (index !== -1 && state.rows) {
          state.rows[index] = { ...state.rows[index], ...action.payload };
        }
      });
  },
});

export const { clearReportData } = reportDetailsSlice.actions;
export default reportDetailsSlice.reducer;
