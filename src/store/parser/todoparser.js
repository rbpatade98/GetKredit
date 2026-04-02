// ── Priority colour map (mirrors TodoContainer) ──────────────────────────────
const PRIORITY_COLOR = {
  High: { bg: "#fee2e2", text: "#dc2626" },
  Medium: { bg: "#fef3c7", text: "#d97706" },
  Low: { bg: "#dcfce7", text: "#16a34a" },
};

/**
 * parseTaskToCalendarEvent
 * Converts a raw task object into a FullCalendar-compatible event object.
 *
 * @param {Object} task
 * @param {number|string} task.id
 * @param {string} task.subject
 * @param {string} task.startDate   – "YYYY-MM-DD"
 * @param {string} task.endDate     – "YYYY-MM-DD"
 * @param {string} task.priority    – "Low" | "Medium" | "High"
 * @param {string} task.notes
 * @param {string} task.status      – "Open" | "Closed" | "Overdue"
 * @returns {Object} FullCalendar event
 */
export const parseTaskToCalendarEvent = (task) => {
  const colors = PRIORITY_COLOR[task.priority] ?? { bg: "#3b82f6", text: "#ffffff" };

  return {
    id: String(task.id),
    title: task.subject,
    start: task.startDate,
    end: task.endDate,
    backgroundColor: colors.bg,
    textColor: colors.text,
    borderColor: colors.text,
    extendedProps: {
      notes: task.notes,
      priority: task.priority,
      status: task.status,
      endDate: task.endDate,
    },
  };
};

/**
 * parseTasksToCalendarEvents
 * Batch converts an array of tasks to FullCalendar events.
 *
 * @param {Object[]} tasks
 * @returns {Object[]}
 */
export const parseTasksToCalendarEvents = (tasks = []) =>
  tasks.map(parseTaskToCalendarEvent);

/**
 * parseFormToTask
 * Merges a form payload with a generated id and default status.
 * Used when creating a new task from the Add drawer.
 *
 * @param {Object} formData  – { subject, notes, startDate, endDate, priority }
 * @returns {Object} task
 */
export const parseFormToTask = (formData) => ({
  id: Date.now(),
  ...formData,
  status: "Open",
});

/**
 * parseTaskToEditForm
 * Extracts only the editable fields from a full task object.
 *
 * @param {Object} task
 * @returns {{ subject, notes, startDate, endDate, priority }}
 */
export const parseTaskToEditForm = (task) => ({
  subject: task.subject ?? "",
  notes: task.notes ?? "",
  startDate: task.startDate ?? "",
  endDate: task.endDate ?? "",
  priority: task.priority ?? "",
});

/**
 * filterTasks
 * Pure-function filter used to derive the visible task list.
 *
 * @param {Object[]} tasks
 * @param {string}   search          – free-text search string
 * @param {Object}   appliedFilters  – { subject, priority, status, startDate, endDate }
 * @returns {Object[]}
 */
export const filterTasks = (tasks = [], search = "", appliedFilters = {}) =>
  tasks.filter((task) => {
    const matchesSearch = task.subject
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSubject =
      !appliedFilters.subject ||
      task.subject
        .toLowerCase()
        .includes(appliedFilters.subject.toLowerCase());

    const matchesPriority =
      !appliedFilters.priority || task.priority === appliedFilters.priority;

    const matchesStatus =
      !appliedFilters.status || task.status === appliedFilters.status;

    const matchesStartDate =
      !appliedFilters.startDate || task.startDate >= appliedFilters.startDate;

    const matchesEndDate =
      !appliedFilters.endDate || task.endDate <= appliedFilters.endDate;

    return (
      matchesSearch &&
      matchesSubject &&
      matchesPriority &&
      matchesStatus &&
      matchesStartDate &&
      matchesEndDate
    );
  });

/**
 * getKPICounts
 * Derives counts for the four KPI cards from the task list.
 *
 * @param {Object[]} tasks
 * @returns {{ all: number, open: number, closed: number, overdue: number }}
 */
export const getKPICounts = (tasks = []) => ({
  all: tasks.length,
  open: tasks.filter((t) => t.status === "Open").length,
  closed: tasks.filter((t) => t.status === "Closed").length,
  overdue: tasks.filter((t) => t.status === "Overdue").length,
});

/**
 * validateTaskForm
 * Validates add/edit form data and returns an errors object.
 * Empty object = valid.
 *
 * @param {{ subject, startDate, endDate, priority }} data
 * @returns {Object} errors
 */
export const validateTaskForm = (data = {}) => {
  const errors = {};

  if (!data.subject?.trim()) errors.subject = "Subject is required";
  if (!data.startDate) errors.startDate = "Start date is required";
  if (!data.endDate) errors.endDate = "End date is required";
  if (!data.priority) errors.priority = "Priority is required";

  if (data.startDate && data.endDate && data.endDate < data.startDate)
    errors.endDate = "End date cannot be before start date";

  return errors;
};