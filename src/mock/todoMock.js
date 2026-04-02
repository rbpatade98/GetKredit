/**
 * todoMock.js
 * ─────────────────────────────────────────────────────────────
 * Static mock tasks that cover every status, priority, and a
 * spread of dates — useful for development, Storybook, and tests.
 * ─────────────────────────────────────────────────────────────
 */

export const mockTasks = [
  // ── Open tasks ────────────────────────────────────────────
  {
    id: 1,
    subject: "Prepare Q2 financial report",
    notes: "Consolidate data from all departments and prepare slides for CFO review.",
    startDate: "2026-04-01",
    endDate: "2026-04-10",
    priority: "High",
    status: "Open",
  },
  {
    id: 2,
    subject: "Update onboarding documentation",
    notes: "Revise the onboarding checklist based on feedback from the last cohort.",
    startDate: "2026-04-05",
    endDate: "2026-04-20",
    priority: "Medium",
    status: "Open",
  },
  {
    id: 3,
    subject: "Schedule team retrospective",
    notes: "",
    startDate: "2026-04-08",
    endDate: "2026-04-09",
    priority: "Low",
    status: "Open",
  },

  // ── Closed tasks ──────────────────────────────────────────
  {
    id: 4,
    subject: "Design new dashboard wireframes",
    notes: "Delivered Figma file to the design review meeting on 28 March.",
    startDate: "2026-03-20",
    endDate: "2026-03-28",
    priority: "High",
    status: "Closed",
  },
  {
    id: 5,
    subject: "Fix login redirect bug",
    notes: "Resolved the OAuth callback mismatch in the staging environment.",
    startDate: "2026-03-25",
    endDate: "2026-03-27",
    priority: "High",
    status: "Closed",
  },
  {
    id: 6,
    subject: "Write unit tests for parser module",
    notes: "Coverage brought up to 85 %.",
    startDate: "2026-03-15",
    endDate: "2026-03-22",
    priority: "Medium",
    status: "Closed",
  },

  // ── Overdue tasks ─────────────────────────────────────────
  {
    id: 7,
    subject: "Submit vendor contract for review",
    notes: "Legal team is waiting on the updated SLA terms.",
    startDate: "2026-03-01",
    endDate: "2026-03-10",
    priority: "High",
    status: "Overdue",
  },
  {
    id: 8,
    subject: "Migrate legacy database tables",
    notes: "Schema migration script is ready but deployment window was missed.",
    startDate: "2026-03-05",
    endDate: "2026-03-15",
    priority: "Medium",
    status: "Overdue",
  },
  {
    id: 9,
    subject: "Send newsletter to subscribers",
    notes: "Draft approved; distribution keeps getting postponed.",
    startDate: "2026-03-18",
    endDate: "2026-03-21",
    priority: "Low",
    status: "Overdue",
  },

  // ── Mixed – longer running ────────────────────────────────
  {
    id: 10,
    subject: "Conduct UX user interviews",
    notes: "10 sessions scheduled across two weeks. Synthesise findings into Notion.",
    startDate: "2026-04-07",
    endDate: "2026-04-18",
    priority: "Medium",
    status: "Open",
  },
  {
    id: 11,
    subject: "Set up CI/CD pipeline for mobile app",
    notes: "Use GitHub Actions; target build time < 8 min.",
    startDate: "2026-04-03",
    endDate: "2026-04-14",
    priority: "High",
    status: "Open",
  },
  {
    id: 12,
    subject: "Renew SSL certificates",
    notes: "Three domains expire on 30 April.",
    startDate: "2026-04-01",
    endDate: "2026-04-25",
    priority: "Low",
    status: "Closed",
  },
];

/**
 * Convenience grouped exports
 */
export const openTasks = mockTasks.filter((t) => t.status === "Open");
export const closedTasks = mockTasks.filter((t) => t.status === "Closed");
export const overdueTasks = mockTasks.filter((t) => t.status === "Overdue");

export default mockTasks;