import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  CircularProgress,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const ReportsTable = ({
  data = [],
  loading,
  columns = [],
  columnLabels = {},
  onView,
}) => {
  if (loading) {
    return (
      <Box textAlign="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data.length) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="body2" color="text.secondary">
          No data found
        </Typography>
      </Box>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ bgcolor: "#f5f7fa" }}>
          {columns.map((col) => (
            <TableCell key={col} sx={{ fontWeight: 500, color: "#555" }}>
              {columnLabels[col] || col}
            </TableCell>
          ))}
          {onView && (
            <TableCell sx={{ fontWeight: 500, color: "#555" }}>
              Action
            </TableCell>
          )}
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((row, i) => (
          <TableRow key={row.id || i} sx={{ borderBottom: "1px solid #eee" }}>
            {columns.map((col) => (
              <TableCell key={col}>
                {col === "leadName" ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>
                      {row.leadName?.[0]}
                    </Avatar>
                    {row.leadName}
                  </Box>
                ) : col === "contactDetails" ? (
                  <Box>
                    <Typography variant="body2">
                      {row.contactDetails}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.email}
                    </Typography>
                  </Box>
                ) : col === "name" ? (
                  // Reports list page — report name
                  <Typography variant="body2" fontWeight={500}>
                    {row.name}
                  </Typography>
                ) : (
                  row[col]
                )}
              </TableCell>
            ))}
            {onView && (
              <TableCell>
                <IconButton onClick={() => onView(row)} size="small">
                  <VisibilityOutlinedIcon sx={{ color: "#aaa" }} />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReportsTable;
