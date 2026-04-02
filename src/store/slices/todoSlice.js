import { createSlice } from "@reduxjs/toolkit";

const emptyForm = {
  subject: "",
  notes: "",
  startDate: "",
  endDate: "",
  priority: "",
};

const emptyFilters = {
  subject: "",
  priority: "",
  startDate: "",
  endDate: "",
  status: "",
};

const initialState = {
  tasks: [],
  search: "",

  // Drawer
  drawerOpen: false,
  drawerType: "", // "add" | "filter" | "view" | "edit"

  // Add Task form
  formData: { ...emptyForm },
  formErrors: {},
  saveConfirmOpen: false,

  // View / Edit
  selectedTask: null,
  editData: { ...emptyForm },
  editErrors: {},
  editConfirmOpen: false,

  // Filter
  filters: { ...emptyFilters },
  appliedFilters: { ...emptyFilters },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // ── Search ──────────────────────────────────────────────
    setSearch(state, action) {
      state.search = action.payload;
    },

    // ── Drawer ──────────────────────────────────────────────
    openDrawer(state, action) {
      state.drawerType = action.payload; // "add" | "filter" | "view" | "edit"
      state.drawerOpen = true;
    },
    closeDrawer(state) {
      state.drawerOpen = false;
    },
    setDrawerType(state, action) {
      state.drawerType = action.payload;
    },

    // ── Add Task Form ────────────────────────────────────────
    setFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData(state) {
      state.formData = { ...emptyForm };
      state.formErrors = {};
    },
    setFormErrors(state, action) {
      state.formErrors = action.payload;
    },
    clearFormError(state, action) {
      delete state.formErrors[action.payload];
    },
    setSaveConfirmOpen(state, action) {
      state.saveConfirmOpen = action.payload;
    },

    // ── Add Task (confirmed) ─────────────────────────────────
    addTask(state, action) {
      state.tasks.push({
        id: Date.now(),
        ...action.payload,
        status: "Open",
      });
      state.formData = { ...emptyForm };
      state.formErrors = {};
      state.saveConfirmOpen = false;
    },

    // ── View / Select Task ───────────────────────────────────
    setSelectedTask(state, action) {
      state.selectedTask = action.payload;
    },
    updateSelectedTaskStatus(state, action) {
      if (state.selectedTask) {
        state.selectedTask = { ...state.selectedTask, status: action.payload };
      }
    },

    // ── Edit Task Form ───────────────────────────────────────
    setEditData(state, action) {
      state.editData = { ...state.editData, ...action.payload };
    },
    initEditData(state) {
      if (state.selectedTask) {
        state.editData = {
          subject: state.selectedTask.subject,
          notes: state.selectedTask.notes,
          startDate: state.selectedTask.startDate,
          endDate: state.selectedTask.endDate,
          priority: state.selectedTask.priority,
        };
        state.editErrors = {};
      }
    },
    setEditErrors(state, action) {
      state.editErrors = action.payload;
    },
    setEditConfirmOpen(state, action) {
      state.editConfirmOpen = action.payload;
    },

    // ── Update Task (confirmed) ──────────────────────────────
    updateTask(state) {
      const { selectedTask, editData } = state;
      if (!selectedTask) return;
      state.tasks = state.tasks.map((t) =>
        t.id === selectedTask.id
          ? { ...t, ...editData, status: selectedTask.status }
          : t
      );
      state.editConfirmOpen = false;
      state.selectedTask = null;
    },

    // ── Filters ──────────────────────────────────────────────
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    applyFilters(state) {
      state.appliedFilters = { ...state.filters };
      state.drawerOpen = false;
    },
    clearFilters(state) {
      state.filters = { ...emptyFilters };
      state.appliedFilters = { ...emptyFilters };
    },
  },
});

export const {
  setSearch,
  openDrawer,
  closeDrawer,
  setDrawerType,
  setFormData,
  resetFormData,
  setFormErrors,
  clearFormError,
  setSaveConfirmOpen,
  addTask,
  setSelectedTask,
  updateSelectedTaskStatus,
  setEditData,
  initEditData,
  setEditErrors,
  setEditConfirmOpen,
  updateTask,
  setFilters,
  applyFilters,
  clearFilters,
} = todoSlice.actions;

export default todoSlice.reducer;