import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={sidebarOpen} />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Topbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />

        <Box sx={{ p: 3, backgroundColor: "#f2fafe", minHeight: "calc(100vh - 64px)" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}