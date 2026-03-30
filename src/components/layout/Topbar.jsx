import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Topbar({ onMenuClick }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={onMenuClick} sx={{ color: "#000" }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">getKredit</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NotificationsIcon />
          <Avatar src="/src/assets/images/logo.png" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}