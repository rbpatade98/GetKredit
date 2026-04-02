import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../routes/ProtectedRoute";

// Fallback component
const PageLoader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="80vh"
  >
    <CircularProgress sx={{ color: "#0d3b4f" }} />
  </Box>
);

// ── Auth pages (outside DashboardLayout) ────────────────────
const SignIn = lazy(() => import("../pages/auth/SignIn"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));

// ── App pages (inside DashboardLayout) ──────────────────────
const UsersPage = lazy(() => import("../pages/UsersPage"));
const LeadsPage = lazy(() => import("../pages/LeadsPage"));
const PerformancePage = lazy(() => import("../pages/PerformancePage"));
const OrganizationPage = lazy(() => import("../pages/OrganizationPage"));
const MastersPage = lazy(() => import("../pages/MastersPage"));
const InvoicePage = lazy(() => import("../pages/InvoicePage"));
const IncentivesPage = lazy(() => import("../pages/IncentivesPage"));
const RecycleBinPage = lazy(() => import("../pages/RecycleBinPage"));
const ApprovalsPage = lazy(() => import("../pages/ApprovalsPage"));
const DevelopersPage = lazy(() => import("../pages/DevelopersPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ReportsPage = lazy(() => import("../pages/ReportsPage"));
const TodoPage = lazy(() => import("../pages/TodoPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public routes — no layout, no login needed ── */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* ── Protected routes — inside DashboardLayout ── */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default redirect to /users after login */}
          <Route path="/" element={<Navigate to="/users" />} />

          <Route path="/users" element={<UsersPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/recycle-bin" element={<RecycleBinPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/organization" element={<OrganizationPage />} />
          <Route path="/master" element={<MastersPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/incentives" element={<IncentivesPage />} />
          <Route path="/approvals" element={<ApprovalsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Route>

        {/* ── Catch all — redirect unknown routes to signin ── */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Suspense>
  );
}
