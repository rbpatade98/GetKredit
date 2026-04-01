import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";

import {
  People,
  Group,
  Code,
  Star,
  TrendingUp,
  Task,
  CheckCircle,
  Assessment,
  Receipt,
  Business,
  Settings,
  Delete,
  Logout,
  Dashboard,
} from "@mui/icons-material";

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const drawerWidth = 240;
const collapsedWidth = 64;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { text: "Users", icon: <People />, path: "/users" },
  { text: "Leads", icon: <Group />, path: "/leads" },
  { text: "Developers", icon: <Code />, path: "/developers" },
  { text: "Incentives", icon: <Star />, path: "/incentives" },
  { text: "Performance", icon: <TrendingUp />, path: "/performance" },
  { text: "To-do", icon: <Task />, path: "/todo" },
  { text: "Approvals", icon: <CheckCircle />, path: "/approvals" },
  { text: "Reports", icon: <Assessment />, path: "/reports" },
  { text: "Invoice", icon: <Receipt />, path: "/invoice" },
  { text: "Organization", icon: <Business />, path: "/organization" },
  { text: "Master", icon: <Settings />, path: "/master" },
  { text: "Recycle Bin", icon: <Delete />, path: "/recycle-bin" },
];

// ✅ Scrollbar styles — paste once, reuse on any scrollable Box
const scrollbarStyles = {
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255,255,255,0.15)",
    borderRadius: "999px",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    background: "rgba(255,255,255,0.35)",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "rgba(255,255,255,0.55)",
  },
};

export default function Sidebar({ open }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: "width 0.3s ease",
        overflowY: "hidden",
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          overflowX: "hidden",
          overflowY: "hidden", // ✅ paper itself doesn't scroll
          transition: "width 0.3s ease",
          boxSizing: "border-box",
          backgroundColor: "#0d3b4f",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Logo — fixed, never scrolls */}
      <Box
        sx={{
          px: 2,
          display: "flex",
          alignItems: "center",
          minHeight: 64,
          flexShrink: 0, // ✅ stays pinned at top
          overflow: "hidden",
          width: "50%",
        }}
      >
        {open && (
          <Typography variant="h6" fontWeight="bold" noWrap>
            GetKredit
          </Typography>
        )}
      </Box>

      {/* ✅ Only this middle section scrolls */}
      <Box sx={{ flexGrow: 1, ...scrollbarStyles }}>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <Tooltip
              key={item.text}
              title={!open ? item.text : ""}
              placement="right"
              arrow
            >
              <ListItemButton
                component={NavLink}
                to={item.path}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#2E8BC0" : "transparent",
                  "&:hover": { backgroundColor: "#2E8BC0" },
                  justifyContent: open ? "initial" : "center",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  borderRadius: "8px",
                })}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 60,
                    mr: open ? 2 : "auto",
                    ml: open ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Box>

      {/* Logout — fixed, never scrolls */}
      <List sx={{ p: 0, flexShrink: 0 }}>
        {" "}
        {/* ✅ stays pinned at bottom */}
        <Tooltip title={!open ? "Logout" : ""} placement="right" arrow>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              border: "fff solid 1px",
              justifyContent: open ? "initial" : "center",
              paddingLeft: "0px",
              paddingRight: "0px",
              "&:hover": { backgroundColor: "#2E8BC0" },
              borderRadius: "8px",
              position: "center",
            }}
          >
            <ListItemIcon
              sx={{
                color: "#fff",
                minWidth: 60,
                mr: open ? 2 : "auto",
                ml: open ? 2 : "auto",
                justifyContent: "center",
              }}
            >
              <Logout />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
}
