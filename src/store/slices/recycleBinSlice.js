import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { recycleBinData } from "../../mock/recycleBinMock";
import { recycleBinParser } from "../parser/recycleBin.parser";

// Simulate an API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Async Thunk to fetch Recycle Bin data.
 * Transforms the mock data using the recycleBinParser for safety.
 */
export const fetchRecycleBinData = createAsyncThunk(
  "recycleBin/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      await delay(800); // Simulate network latency
      // Normally: return axios.get("/api/recycle-bin").then(res => res.data)
      return recycleBinParser(recycleBinData);
    } catch (err) {
      return rejectWithValue(err?.message || "An unexpected error occurred during fetch");
    }
  }
);

/**
 * Async Thunk to update a row.
 */
export const updateRecycleBinRow = createAsyncThunk(
  "recycleBin/updateRow",
  async (updatedRow, { rejectWithValue }) => {
    try {
      await delay(500);
      return updatedRow;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to update row");
    }
  }
);

/**
 * Async Thunk to delete a row.
 */
export const deleteRecycleBinRow = createAsyncThunk(
  "recycleBin/deleteRow",
  async (id, { rejectWithValue }) => {
    try {
      await delay(500);
      return id;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to delete row");
    }
  }
);

const recycleBinSlice = createSlice({
  name: "recycleBin",
  initialState: {
    rows: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetching Logic
      .addCase(fetchRecycleBinData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecycleBinData.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action?.payload || [];
      })
      .addCase(fetchRecycleBinData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || "Error loading recycle bin data";
      })
      
      // Updating Logic
      .addCase(updateRecycleBinRow.fulfilled, (state, action) => {
        const index = state.rows?.findIndex((r) => r?.id === action.payload?.id);
        if (index !== -1 && state.rows) {
          state.rows[index] = { ...state.rows[index], ...action.payload };
        }
      })
      
      // Deletion Logic
      .addCase(deleteRecycleBinRow.fulfilled, (state, action) => {
        if (state.rows) {
          state.rows = state.rows.filter((r) => r?.id !== action.payload);
        }
      });
  },
});

export default recycleBinSlice.reducer;
