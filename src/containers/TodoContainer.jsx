import React, { useState, lazy, Suspense } from "react";
import KPICard from "../components/common/KPICards";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../components/common/SearchBar";
import AppDrawer from "../components/common/AppDrawer";
import CommonModal from "../components/common/CommonModal";

const Calender = lazy(() => import("../components/common/Calender"));

// ── Mock Data ─────────────────────────────────────────────
const MOCK_TASKS = [
  {
    id: 1,
    subject: "Design new landing page",
    notes:
      "Create wireframes and mockups for the new product landing page. Coordinate with the marketing team for brand guidelines.",
    startDate: "2026-04-01",
    endDate: "2026-04-05",
    priority: "High",
    status: "Open",
  },
  {
    id: 2,
    subject: "Fix login bug on mobile",
    notes:
      "Users on iOS 17 are unable to log in via Safari. Investigate token storage issue.",
    startDate: "2026-04-02",
    endDate: "2026-04-03",
    priority: "High",
    status: "Open",
  },
  {
    id: 3,
    subject: "Write Q2 project report",
    notes:
      "Summarise project milestones, budget utilisation, and team performance for the Q2 stakeholder review.",
    startDate: "2026-04-07",
    endDate: "2026-04-10",
    priority: "Medium",
    status: "Open",
  },
  {
    id: 4,
    subject: "Update API documentation",
    notes:
      "Reflect breaking changes introduced in v2.4. Add new endpoint examples and update authentication section.",
    startDate: "2026-04-08",
    endDate: "2026-04-12",
    priority: "Medium",
    status: "Open",
  },
  {
    id: 5,
    subject: "Onboard new team member",
    notes:
      "Prepare access credentials, share onboarding docs, and schedule a walkthrough session.",
    startDate: "2026-04-14",
    endDate: "2026-04-15",
    priority: "Low",
    status: "Open",
  },
  {
    id: 6,
    subject: "Security audit review",
    notes:
      "Review findings from the external security audit and prioritise remediation tasks.",
    startDate: "2026-04-14",
    endDate: "2026-04-18",
    priority: "High",
    status: "Open",
  },
  {
    id: 7,
    subject: "Migrate DB to PostgreSQL 16",
    notes:
      "Plan and execute the database migration. Run regression tests post-migration.",
    startDate: "2026-04-21",
    endDate: "2026-04-25",
    priority: "High",
    status: "Open",
  },
  {
    id: 8,
    subject: "Quarterly team retrospective",
    notes:
      "Facilitate the retro session. Collect action items and assign owners.",
    startDate: "2026-04-22",
    endDate: "2026-04-22",
    priority: "Low",
    status: "Open",
  },
  {
    id: 9,
    subject: "Renew SSL certificates",
    notes:
      "Certificates for prod and staging expire on May 1. Automate renewal via Let's Encrypt.",
    startDate: "2026-04-28",
    endDate: "2026-04-30",
    priority: "Medium",
    status: "Open",
  },
  {
    id: 10,
    subject: "Code review: payment module",
    notes:
      "Review PRs #204 and #207 related to the new payment gateway integration.",
    startDate: "2026-03-25",
    endDate: "2026-03-28",
    priority: "High",
    status: "Closed",
  },
  {
    id: 11,
    subject: "Set up CI/CD pipeline",
    notes:
      "Configure GitHub Actions for automated testing and deployment to staging.",
    startDate: "2026-03-20",
    endDate: "2026-03-24",
    priority: "Medium",
    status: "Closed",
  },
  {
    id: 12,
    subject: "Submit compliance report",
    notes: "Annual compliance report was due last week. Escalate immediately.",
    startDate: "2026-03-10",
    endDate: "2026-03-15",
    priority: "High",
    status: "Overdue",
  },
  {
    id: 13,
    subject: "Update privacy policy",
    notes:
      "Align policy with new data residency requirements. Legal review pending.",
    startDate: "2026-03-18",
    endDate: "2026-03-22",
    priority: "Medium",
    status: "Overdue",
  },
];

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

const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
const STATUS_OPTIONS = ["Open", "Closed", "Overdue"];

const PRIORITY_COLOR = {
  High: {
    bg: "#fee2e2",
    text: "#dc2626",
  },
  Medium: {
    bg: "#fef3c7",
    text: "#d97706",
  },
  Low: {
    bg: "#dcfce7",
    text: "#16a34a",
  },
};

const TodoContainer = () => {
  // ── Initialize with mock data ─────────────────────────
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [search, setSearch] = useState("");

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState(""); // "add" | "filter" | "view" | "edit"

  // Add Task form
  const [formData, setFormData] = useState({ ...emptyForm });
  const [formErrors, setFormErrors] = useState({});
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);

  // View / Edit
  const [selectedTask, setSelectedTask] = useState(null);
  const [editData, setEditData] = useState({ ...emptyForm });
  const [editErrors, setEditErrors] = useState({});
  const [editConfirmOpen, setEditConfirmOpen] = useState(false);

  // Filter
  const [filters, setFilters] = useState({ ...emptyFilters });
  const [appliedFilters, setAppliedFilters] = useState({ ...emptyFilters });

  // ── Map tasks → FullCalendar events ──────────────────────
  const calendarEvents = tasks.map((task) => ({
    id: String(task.id),
    title: task.subject,
    start: task.startDate,
    end: task.endDate,
    backgroundColor: PRIORITY_COLOR[task.priority]?.bg ?? "#3b82f6",
    textColor: PRIORITY_COLOR[task.priority]?.text ?? "#ffffff",
    borderColor: PRIORITY_COLOR[task.priority]?.text ?? "#3b82f6",
    extendedProps: {
      notes: task.notes,
      priority: task.priority,
      status: task.status,
      endDate: task.endDate,
    },
  }));

  // ── Filtered tasks (for chip count) ──────────────────────
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.subject
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilters =
      (appliedFilters.subject === "" ||
        task.subject
          .toLowerCase()
          .includes(appliedFilters.subject.toLowerCase())) &&
      (appliedFilters.priority === "" ||
        task.priority === appliedFilters.priority) &&
      (appliedFilters.status === "" || task.status === appliedFilters.status) &&
      (appliedFilters.startDate === "" ||
        task.startDate >= appliedFilters.startDate) &&
      (appliedFilters.endDate === "" || task.endDate <= appliedFilters.endDate);
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
    if (!data.subject.trim()) errors.subject = "Subject is required";
    if (!data.startDate) errors.startDate = "Start date is required";
    if (!data.endDate) errors.endDate = "End date is required";
    if (!data.priority) errors.priority = "Priority is required";
    if (data.startDate && data.endDate && data.endDate < data.startDate)
      errors.endDate = "End date cannot be before start date";
    return errors;
  };

  const handleSaveClick = () => {
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setDrawerOpen(false);
    setSaveConfirmOpen(true);
  };

  const confirmSave = () => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), ...formData, status: "Open" },
    ]);
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
      subject: selectedTask.subject,
      notes: selectedTask.notes,
      startDate: selectedTask.startDate,
      endDate: selectedTask.endDate,
      priority: selectedTask.priority,
    });
    setEditErrors({});
    setDrawerType("edit");
  };

  const handleEditSave = () => {
    const errors = validate(editData);
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }
    setDrawerOpen(false);
    setEditConfirmOpen(true);
  };

  const confirmEdit = () => {
    setTasks((prev) =>
      prev.map((t) => (t.id === selectedTask.id ? { ...t, ...editData } : t)),
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
    add: {
      title: "Add New Task",
      subtitle: "Fill in the details to create a new task",
    },
    filter: {
      title: "Filter Tasks",
      subtitle: "Narrow down tasks by applying filters",
    },
    view: {
      title: "Task Details",
      subtitle: "View the details of the selected task",
    },
    edit: {
      title: "Edit Task",
      subtitle: "Update the details of the selected task",
    },
  };

  const priorityStyle = {
    Low: {
      backgroundColor: PRIORITY_COLOR.Low.bg,
      color: PRIORITY_COLOR.Low.text,
    },
    Medium: {
      backgroundColor: PRIORITY_COLOR.Medium.bg,
      color: PRIORITY_COLOR.Medium.text,
    },
    High: {
      backgroundColor: PRIORITY_COLOR.High.bg,
      color: PRIORITY_COLOR.High.text,
    },
  };

  return (
    <>
      {/* KPI Cards */}
      <Box display="flex" gap={1} overflow="auto" p={1}>
        <KPICard
          title="All Tasks"
          count={tasks.length.toString()}
          bgColor="#eff6ff"
          borderColor="#bfdbfe"
          lineColor="#3b82f6"
          subtitle="+12% from last week"
        />
        <KPICard
          title="Open Tasks"
          count={tasks.filter((t) => t.status === "Open").length.toString()}
          bgColor="#fffbeb"
          borderColor="#fde68a"
          lineColor="#f59e0b"
          subtitle="+5 today"
        />
        <KPICard
          title="Closed Tasks"
          count={tasks.filter((t) => t.status === "Closed").length.toString()}
          bgColor="#ecfdf5"
          borderColor="#86efac"
          lineColor="#22c55e"
        />
        <KPICard
          title="Overdue Tasks"
          count={tasks.filter((t) => t.status === "Overdue").length.toString()}
          bgColor="#fef2f2"
          borderColor="#fecaca"
          lineColor="#ef4444"
        />
      </Box>

      {/* Main Section */}
      <Box
        backgroundColor="#ffffff"
        p={2}
        borderRadius={2}
        mt={2}
        mb={3}
        boxShadow={1}
      >
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
              backgroundColor: "#0d3b4f",
              color: "#fff",
              fontWeight: 500,
              textTransform: "none",
              borderRadius: "6px",
              px: 2,
              py: 0.8,
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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{ mt: 1, mb: 1 }}
        >
          <SearchBar
            placeholder="Search Tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "100%", maxWidth: 430, height: "40px" }}
          />
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={() => {
              setDrawerType("filter");
              setDrawerOpen(true);
            }}
            sx={{
              backgroundColor: "#ffffff",
              color: "#0d3b4f",
              border: "1px solid #d9e3ed",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "8px",
              px: 2,
              py: 1,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#0d3b4f",
                color: "#ffffff",
                borderColor: "#0d3b4f",
                boxShadow: "none",
              },
            }}
          >
            Add Filters
          </Button>
        </Box>

        {/* Calendar */}
        <Suspense
          fallback={
            <Box
              sx={{
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Calender
            events={calendarEvents}
            onDateClick={(info) => console.log("Clicked date:", info.dateStr)}
            onEventClick={handleEventClick}
          />
        </Suspense>

        {/* ── Shared Drawer ─────────────────────────────────── */}
        <AppDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={drawerMeta[drawerType]?.title ?? ""}
          subtitle={drawerMeta[drawerType]?.subtitle ?? ""}
          onPrimaryClick={
            drawerType === "filter"
              ? handleApplyFilters
              : drawerType === "view"
                ? handleOpenEdit
                : drawerType === "edit"
                  ? handleEditSave
                  : handleSaveClick
          }
          onSecondaryClick={
            drawerType === "filter"
              ? handleClearFilters
              : drawerType === "view"
                ? () => setDrawerOpen(false)
                : drawerType === "edit"
                  ? () => setDrawerType("view")
                  : () => setDrawerOpen(false)
          }
          primaryText={
            drawerType === "filter"
              ? "Apply"
              : drawerType === "view"
                ? "Edit Task"
                : "Save"
          }
          secondaryText={
            drawerType === "filter"
              ? "Clear all"
              : drawerType === "view"
                ? "Close"
                : drawerType === "edit"
                  ? "Back"
                  : "Cancel"
          }
          fields={
            drawerType === "add"
              ? [
                  {
                    label: "Subject",
                    value: formData.subject,
                    onChange: handleChange,
                    error: !!formErrors.subject,
                    helperText: formErrors.subject,
                    textFieldProps: { name: "subject" },
                  },
                  {
                    label: "Notes",
                    value: formData.notes,
                    onChange: handleChange,
                    multiline: true,
                    rows: 3,
                    textFieldProps: { name: "notes" },
                  },
                  {
                    label: "Start Date",
                    value: formData.startDate,
                    onChange: handleChange,
                    type: "date",
                    error: !!formErrors.startDate,
                    helperText: formErrors.startDate,
                    textFieldProps: { name: "startDate" },
                  },
                  {
                    label: "End Date",
                    value: formData.endDate,
                    onChange: handleChange,
                    type: "date",
                    error: !!formErrors.endDate,
                    helperText: formErrors.endDate,
                    textFieldProps: { name: "endDate" },
                  },
                  {
                    label: "Priority",
                    value: formData.priority,
                    onChange: handleChange,
                    select: true,
                    options: PRIORITY_OPTIONS,
                    error: !!formErrors.priority,
                    helperText: formErrors.priority,
                    textFieldProps: { name: "priority" },
                  },
                ]
              : drawerType === "edit"
                ? [
                    {
                      label: "Subject",
                      value: editData.subject,
                      onChange: (e) =>
                        setEditData({ ...editData, subject: e.target.value }),
                      error: !!editErrors.subject,
                      helperText: editErrors.subject,
                    },
                    {
                      label: "Notes",
                      value: editData.notes,
                      onChange: (e) =>
                        setEditData({ ...editData, notes: e.target.value }),
                      multiline: true,
                      rows: 3,
                    },
                    {
                      label: "Start Date",
                      value: editData.startDate,
                      onChange: (e) =>
                        setEditData({
                          ...editData,
                          startDate: e.target.value,
                        }),
                      type: "date",
                      error: !!editErrors.startDate,
                      helperText: editErrors.startDate,
                    },
                    {
                      label: "End Date",
                      value: editData.endDate,
                      onChange: (e) =>
                        setEditData({ ...editData, endDate: e.target.value }),
                      type: "date",
                      error: !!editErrors.endDate,
                      helperText: editErrors.endDate,
                    },
                    {
                      label: "Priority",
                      value: editData.priority,
                      onChange: (e) =>
                        setEditData({ ...editData, priority: e.target.value }),
                      select: true,
                      options: PRIORITY_OPTIONS,
                      error: !!editErrors.priority,
                      helperText: editErrors.priority,
                    },
                    {
                      label: "Status",
                      value: selectedTask?.status ?? "Open",
                      onChange: (e) =>
                        setSelectedTask({
                          ...selectedTask,
                          status: e.target.value,
                        }),
                      select: true,
                      options: STATUS_OPTIONS,
                    },
                  ]
                : drawerType === "filter"
                  ? [
                      {
                        label: "Subject / Title",
                        value: filters.subject,
                        onChange: (e) =>
                          setFilters({ ...filters, subject: e.target.value }),
                        textFieldProps: { placeholder: "Search by subject" },
                      },
                      {
                        label: "Priority",
                        value: filters.priority,
                        onChange: (e) =>
                          setFilters({ ...filters, priority: e.target.value }),
                        select: true,
                        options: ["", ...PRIORITY_OPTIONS].map((opt) => ({
                          label: opt || "All",
                          value: opt,
                        })),
                      },
                      {
                        label: "Status",
                        value: filters.status,
                        onChange: (e) =>
                          setFilters({ ...filters, status: e.target.value }),
                        select: true,
                        options: ["", ...STATUS_OPTIONS].map((opt) => ({
                          label: opt || "All",
                          value: opt,
                        })),
                      },
                      {
                        label: "Start Date",
                        value: filters.startDate,
                        onChange: (e) =>
                          setFilters({
                            ...filters,
                            startDate: e.target.value,
                          }),
                        type: "date",
                      },
                      {
                        label: "End Date",
                        value: filters.endDate,
                        onChange: (e) =>
                          setFilters({ ...filters, endDate: e.target.value }),
                        type: "date",
                      },
                    ]
                  : []
          }
        >
          {/* ── View Task ─────────────────────────────────── */}
          {drawerType === "view" && selectedTask && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Subject
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {selectedTask.subject}
                </Typography>
              </Box>
              <Divider />

              <Box display="flex" gap={2}>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Priority
                  </Typography>
                  <Box mt={0.5}>
                    <Chip
                      label={selectedTask.priority}
                      size="small"
                      sx={{
                        ...priorityStyle[selectedTask.priority],
                        fontWeight: 600,
                        fontSize: 11,
                      }}
                    />
                  </Box>
                </Box>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Status
                  </Typography>
                  <Box mt={0.5}>
                    <Chip
                      label={selectedTask.status}
                      size="small"
                      sx={{
                        backgroundColor: "#E5F7FF",
                        color: "#0F4C5C",
                        fontWeight: 600,
                        fontSize: 11,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Divider />

              <Box display="flex" gap={2}>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Start Date
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {selectedTask.startDate}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    End Date
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {selectedTask.endDate}
                  </Typography>
                </Box>
              </Box>
              <Divider />

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Notes
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, whiteSpace: "pre-wrap" }}
                >
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
