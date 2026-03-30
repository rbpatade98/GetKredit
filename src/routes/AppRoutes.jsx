// src/routes/AppRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../routes/ProtectedRoute";

// ── Auth pages (outside DashboardLayout) ────────────────────
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

// ── App pages (inside DashboardLayout) ──────────────────────
import  UsersPage from "../pages/UsersPage";
import LeadsPage from "../pages/LeadsPage";
// import RecycleBin from "../pages/RecycleBin/RecycleBin";
// import Reports from "../pages/ReportsPage";
// import ReportsList from "../pages/Reports/ReportsList";
// import ReportView from "../pages/Reports/ReportView";
import PerformancePage  from "../pages/PerformancePage";
import OrganizationPage  from "../pages/OrganizationPage";
import MastersPage  from "../pages/MastersPage";
import InvoicePage from "../pages/InvoicePage";
import IncentivesPage from "../pages/IncentivesPage";
// import Todo from "../pages/Todo/Todo";
import RecycleBinPage from "../pages/RecycleBinPage";
import ApprovalsPage from "../pages/ApprovalsPage";
import DevelopersPage  from "../pages/DevelopersPage"; 
import DashboardPage from "../pages/DashboardPage";
import ReportsPage from "../pages/ReportsPage";
import TodoPage from "../pages/TodoPage";


export default function AppRoutes() {
  return (
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
        {/* <Route path="/todo" element={<Todo />} /> */}
        <Route path="/approvals" element={<ApprovalsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/todo" element={<TodoPage />} />

      </Route>

      {/* ── Catch all — redirect unknown routes to signin ── */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}
