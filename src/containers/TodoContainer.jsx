import React, { useState } from "react";
import KPICard from "../components/common/KPICards";
import {
  Box, Typography, Chip, Button, TextField, MenuItem, Divider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchBar from "../components/common/SearchBar";
import Calender from "../components/common/Calender";
import AppDrawer from "../components/common/AppDrawer";
import CommonModal from "../components/common/CommonModal";

const emptyForm = {
  subject:   "",
  notes:     "",
  startDate: "",
  endDate:   "",
  priority:  "",
};

const emptyFilters = {
  subject:   "",
  priority:  "",
  startDate: "",
  endDate:   "",
  status:    "",
};

const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
const STATUS_OPTIONS   = ["Open", "Closed", "Overdue"];

// Priority → calendar dot color
const PRIORITY_COLOR = {
  Low:    "#22c55e",
  Medium: "#f97316",
  High:   "#ef4444",
};

const TodoContainer = () => {
  const [tasks, setTasks]   = useState([]);
  const [search, setSearch] = useState("");

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState(""); // "add" | "filter" | "view" | "edit"

  // Add Task form
  const [formData, setFormData]           = useState({ ...emptyForm });
  const [formErrors, setFormErrors]       = useState({});
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);

  // View / Edit
  const [selectedTask, setSelectedTask]   = useState(null);
  const [editData, setEditData]           = useState({ ...emptyForm });
  const [editErrors, setEditErrors]       = useState({});
  const [editConfirmOpen, setEditConfirmOpen] = useState(false);

  // Filter
  const [filters, setFilters]               = useState({ ...emptyFilters });
  const [appliedFilters, setAppliedFilters] = useState({ ...emptyFilters });

  // ── Map tasks → FullCalendar events ──────────────────────
  const calendarEvents = tasks.map((task) => ({
    id:    String(task.id),
    title: task.subject,
    start: task.startDate,
    end:   task.endDate,
    color: PRIORITY_COLOR[task.priority] ?? "#3b82f6",
    extendedProps: {
      notes:    task.notes,
      priority: task.priority,
      status:   task.status,
      endDate:  task.endDate,
    },
  }));

  // ── Filtered tasks (for chip count) ──────────────────────
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.subject.toLowerCase().includes(search.toLowerCase());
    const matchesFilters =
      (appliedFilters.subject   === "" || task.subject.toLowerCase().includes(appliedFilters.subject.toLowerCase())) &&
      (appliedFilters.priority  === "" || task.priority === appliedFilters.priority) &&
      (appliedFilters.status    === "" || task.status   === appliedFilters.status) &&
      (appliedFilters.startDate === "" || task.startDate >= appliedFilters.startDate) &&
      (appliedFilters.endDate   === "" || task.endDate  <= appliedFilters.endDate);
    return matchesSearch && matchesFilters;
  });

  // ── Add Task ──────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (data) => {
    const errors = {};
    if (!data.subject.trim()) errors.subject   = "Subject is required";
    if (!data.startDate)      errors.startDate = "Start date is required";
    if (!data.endDate)        errors.endDate   = "End date is required";
    if (!data.priority)       errors.priority  = "Priority is required";
    if (data.startDate && data.endDate && data.endDate < data.startDate)
      errors.endDate = "End date cannot be before start date";
    return errors;
  };

  // Add: Step 1 — validate → close drawer → open confirm
  const handleSaveClick = () => {
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setDrawerOpen(false);
    setSaveConfirmOpen(true);
  };

  // Add: Step 2 — confirmed → push to tasks
  const confirmSave = () => {
    setTasks((prev) => [...prev, { id: Date.now(), ...formData, status: "Open" }]);
    setFormData({ ...emptyForm });
    setFormErrors({});
    setSaveConfirmOpen(false);
  };

  // ── Calendar event click → open View drawer ───────────────
  const handleEventClick = (info) => {
    const { event } = info;
    const task = tasks.find((t) => String(t.id) === event.id);
    if (!task) return;
    setSelectedTask(task);
    setDrawerType("view");
    setDrawerOpen(true);
  };

  // ── View → Edit button click ──────────────────────────────
  const handleOpenEdit = () => {
    setEditData({
      subject:   selectedTask.subject,
      notes:     selectedTask.notes,
      startDate: selectedTask.startDate,
      endDate:   selectedTask.endDate,
      priority:  selectedTask.priority,
    });
    setEditErrors({});
    setDrawerType("edit");
  };

  // Edit: Step 1 — validate → close drawer → open confirm
  const handleEditSave = () => {
    const errors = validate(editData);
    if (Object.keys(errors).length > 0) { setEditErrors(errors); return; }
    setDrawerOpen(false);
    setEditConfirmOpen(true);
  };

  // Edit: Step 2 — confirmed → update task
  const confirmEdit = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask.id ? { ...t, ...editData } : t
      )
    );
    setEditConfirmOpen(false);
    setSelectedTask(null);
  };

  // ── Filter ────────────────────────────────────────────────
  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setDrawerOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({ ...emptyFilters });
    setAppliedFilters({ ...emptyFilters });
  };

  // ── Drawer title & subtitle map ───────────────────────────
  const drawerMeta = {
    add:    { title: "Add New Task",   subtitle: "Fill in the details to create a new task" },
    filter: { title: "Filter Tasks",   subtitle: "Narrow down tasks by applying filters" },
    view:   { title: "Task Details",   subtitle: "View the details of the selected task" },
    edit:   { title: "Edit Task",      subtitle: "Update the details of the selected task" },
  };

  // ── Priority badge style ──────────────────────────────────
  const priorityStyle = {
    Low:    { backgroundColor: "#ecfdf5", color: "#16a34a" },
    Medium: { backgroundColor: "#fff7ed", color: "#ea580c" },
    High:   { backgroundColor: "#fef2f2", color: "#dc2626" },
  };

  return (
    <>
      {/* KPI Cards */}
      <Box display="flex" gap={1} overflow="auto" p={1}>
        <KPICard title="All Tasks"     count={tasks.length.toString()}                               bgColor="#eff6ff" borderColor="#bfdbfe" lineColor="#3b82f6" subtitle="+12% from last week" />
        <KPICard title="Open Tasks"    count={tasks.filter((t) => t.status === "Open").length.toString()}    bgColor="#fffbeb" borderColor="#fde68a" lineColor="#f59e0b" subtitle="+5 today" />
        <KPICard title="Closed Tasks"  count={tasks.filter((t) => t.status === "Closed").length.toString()}  bgColor="#ecfdf5" borderColor="#86efac" lineColor="#22c55e" />
        <KPICard title="Overdue Tasks" count={tasks.filter((t) => t.status === "Overdue").length.toString()} bgColor="#fef2f2" borderColor="#fecaca" lineColor="#ef4444" />
      </Box>

      {/* Main Section */}
      <Box backgroundColor="#ffffff" p={2} borderRadius={2} mt={2} mb={3} boxShadow={1}>

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">All Tasks</Typography>
            <Chip
              label={`${filteredTasks.length} Tasks`}
              sx={{ backgroundColor: "#E5F7FF", color: "#0F4C5C" }}
              size="small"
            />
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setFormData({ ...emptyForm });
              setFormErrors({});
              setDrawerType("add");
              setDrawerOpen(true);
            }}
            sx={{
              backgroundColor: "#0d3b4f", color: "#fff", fontWeight: 500,
              textTransform: "none", borderRadius: "6px", px: 2, py: 0.8,
              "&:hover": { backgroundColor: "#0b2c3a" },
            }}
          >
            Add Task
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Here you can see all the tasks.
        </Typography>
        <hr />

        {/* Search & Filter */}
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} sx={{ mt: 1, mb: 1 }}>
          <SearchBar
            placeholder="Search Tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "100%", maxWidth: 430, height: "40px" }}
          />
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={() => { setDrawerType("filter"); setDrawerOpen(true); }}
            sx={{
              backgroundColor: "#ffffff", color: "#0d3b4f", border: "1px solid #d9e3ed",
              fontWeight: 600, textTransform: "none", borderRadius: "8px",
              px: 2, py: 1, boxShadow: "none",
              "&:hover": { backgroundColor: "#0d3b4f", color: "#ffffff", borderColor: "#0d3b4f", boxShadow: "none" },
            }}
          >
            Add Filters
          </Button>
        </Box>

        {/* Calendar */}
        <Calender
          events={calendarEvents}
          onDateClick={(info) => console.log("Clicked date:", info.dateStr)}
          onEventClick={handleEventClick}
        />

        {/* ── Shared Drawer ─────────────────────────────────── */}
        <AppDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={drawerMeta[drawerType]?.title ?? ""}
          subtitle={drawerMeta[drawerType]?.subtitle ?? ""}
          onPrimaryClick={
            drawerType === "filter" ? handleApplyFilters :
            drawerType === "view" ? handleOpenEdit :
            drawerType === "edit" ? handleEditSave :
            handleSaveClick
          }
          onSecondaryClick={
            drawerType === "filter" ? handleClearFilters :
            drawerType === "view" ? () => setDrawerOpen(false) :
            drawerType === "edit" ? () => setDrawerType("view") :
            () => setDrawerOpen(false)
          }
          primaryText={
            drawerType === "filter" ? "Apply" :
            drawerType === "view" ? "Edit Task" :
            "Save"
          }
          secondaryText={
            drawerType === "filter" ? "Clear all" :
            drawerType === "view" ? "Close" :
            drawerType === "edit" ? "Back" :
            "Cancel"
          }
          fields={
            drawerType === "add" ? [
              { label: "Subject", value: formData.subject, onChange: handleChange, error: !!formErrors.subject, helperText: formErrors.subject, textFieldProps: { name: "subject" } },
              { label: "Notes", value: formData.notes, onChange: handleChange, multiline: true, rows: 3, textFieldProps: { name: "notes" } },
              { label: "Start Date", value: formData.startDate, onChange: handleChange, type: "date", error: !!formErrors.startDate, helperText: formErrors.startDate, textFieldProps: { name: "startDate" } },
              { label: "End Date", value: formData.endDate, onChange: handleChange, type: "date", error: !!formErrors.endDate, helperText: formErrors.endDate, textFieldProps: { name: "endDate" } },
              { label: "Priority", value: formData.priority, onChange: handleChange, select: true, options: PRIORITY_OPTIONS, error: !!formErrors.priority, helperText: formErrors.priority, textFieldProps: { name: "priority" } },
            ] : drawerType === "edit" ? [
              { label: "Subject", value: editData.subject, onChange: (e) => setEditData({ ...editData, subject: e.target.value }), error: !!editErrors.subject, helperText: editErrors.subject },
              { label: "Notes", value: editData.notes, onChange: (e) => setEditData({ ...editData, notes: e.target.value }), multiline: true, rows: 3 },
              { label: "Start Date", value: editData.startDate, onChange: (e) => setEditData({ ...editData, startDate: e.target.value }), type: "date", error: !!editErrors.startDate, helperText: editErrors.startDate },
              { label: "End Date", value: editData.endDate, onChange: (e) => setEditData({ ...editData, endDate: e.target.value }), type: "date", error: !!editErrors.endDate, helperText: editErrors.endDate },
              { label: "Priority", value: editData.priority, onChange: (e) => setEditData({ ...editData, priority: e.target.value }), select: true, options: PRIORITY_OPTIONS, error: !!editErrors.priority, helperText: editErrors.priority },
              { label: "Status", value: selectedTask?.status ?? "Open", onChange: (e) => setSelectedTask({ ...selectedTask, status: e.target.value }), select: true, options: STATUS_OPTIONS },
            ] : drawerType === "filter" ? [
              { label: "Subject / Title", value: filters.subject, onChange: (e) => setFilters({ ...filters, subject: e.target.value }), textFieldProps: { placeholder: "Search by subject" } },
              { label: "Priority", value: filters.priority, onChange: (e) => setFilters({ ...filters, priority: e.target.value }), select: true, options: ["", ...PRIORITY_OPTIONS].map(opt => ({ label: opt || "All", value: opt })) },
              { label: "Status", value: filters.status, onChange: (e) => setFilters({ ...filters, status: e.target.value }), select: true, options: ["", ...STATUS_OPTIONS].map(opt => ({ label: opt || "All", value: opt })) },
              { label: "Start Date", value: filters.startDate, onChange: (e) => setFilters({ ...filters, startDate: e.target.value }), type: "date" },
              { label: "End Date", value: filters.endDate, onChange: (e) => setFilters({ ...filters, endDate: e.target.value }), type: "date" },
            ] : []
          }
        >
          {/* ── View Task ─────────────────────────────────── */}
          {drawerType === "view" && selectedTask && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

              {/* Subject */}
              <Box>
                <Typography variant="caption" color="text.secondary">Subject</Typography>
                <Typography variant="body1" fontWeight={600}>{selectedTask.subject}</Typography>
              </Box>
              <Divider />

              {/* Priority & Status */}
              <Box display="flex" gap={2}>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">Priority</Typography>
                  <Box mt={0.5}>
                    <Chip
                      label={selectedTask.priority}
                      size="small"
                      sx={{ ...priorityStyle[selectedTask.priority], fontWeight: 600, fontSize: 11 }}
                    />
                  </Box>
                </Box>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">Status</Typography>
                  <Box mt={0.5}>
                    <Chip
                      label={selectedTask.status}
                      size="small"
                      sx={{ backgroundColor: "#E5F7FF", color: "#0F4C5C", fontWeight: 600, fontSize: 11 }}
                    />
                  </Box>
                </Box>
              </Box>
              <Divider />

              {/* Dates */}
              <Box display="flex" gap={2}>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">Start Date</Typography>
                  <Typography variant="body2" fontWeight={500}>{selectedTask.startDate}</Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">End Date</Typography>
                  <Typography variant="body2" fontWeight={500}>{selectedTask.endDate}</Typography>
                </Box>
              </Box>
              <Divider />

              {/* Notes */}
              <Box>
                <Typography variant="caption" color="text.secondary">Notes</Typography>
                <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: "pre-wrap" }}>
                  {selectedTask.notes || "—"}
                </Typography>
              </Box>
            </Box>
          )}
        </AppDrawer>
      </Box>

      {/* ── Add Task Confirm Modal ──────────────────────────── */}
      <CommonModal
        open={saveConfirmOpen}
        onClose={() => setSaveConfirmOpen(false)}
        title="Are you sure you want to add this task?"
        description={`You are about to add "${formData.subject}" with ${formData.priority} priority.`}
        confirmText="Yes, add"
        cancelText="No"
        onConfirm={confirmSave}
      />

      {/* ── Edit Task Confirm Modal ─────────────────────────── */}
      <CommonModal
        open={editConfirmOpen}
        onClose={() => setEditConfirmOpen(false)}
        title="Are you sure you want to save changes?"
        description={`You are about to update "${selectedTask?.subject}".`}
        confirmText="Yes, save"
        cancelText="No"
        onConfirm={confirmEdit}
      />
    </>
  );
};

export default TodoContainer;