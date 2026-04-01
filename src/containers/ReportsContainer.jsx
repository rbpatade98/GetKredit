import { useState } from "react";
import { Box, Typography, Chip, Divider, IconButton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SearchBar from "../components/common/SearchBar";
import CustomDataGrid from "../components/common/CustomDataGrid";
import ReportDetailContainer from "./ReportDetailContainer";
import { reportsMock } from "../mock/reportDetailsMock";

const ReportsContainer = () => {
  const [rows]           = useState(reportsMock);

  const [search, setSearch]               = useState("");
  const [selectedReport, setSelectedReport] = useState(null); // ← ADD

  // ── If a report is selected, show detail view ──────────────
  if (selectedReport) {                                        // ← ADD
    return (
      <ReportDetailContainer
        report={selectedReport}
        onBack={() => setSelectedReport(null)}
      />
    );
  }

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "name",        headerName: "Report name",  flex: 1, minWidth: 180 },
    { field: "description", headerName: "Description",  flex: 2, minWidth: 230 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => setSelectedReport(params.row)} // ← CHANGE (was alert)
        >
          <VisibilityOutlinedIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box backgroundColor="#ffffff" p={2} borderRadius={2} mb={3} boxShadow={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h6">Reports</Typography>
        <Chip
          label={`${filteredRows.length} Reports`}
          sx={{ backgroundColor: "#E5F7FF", color: "#0F4C5C" }}
          size="small"
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        See all the reports here regarding various categories.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} sx={{ mt: 1, mb: 1 }}>
        <SearchBar
          placeholder="Search reports"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "100%", maxWidth: 430, height: "40px" }}
        />
      </Box>
      <CustomDataGrid rows={filteredRows} columns={columns} pageSize={5} autoHeight />
    </Box>
  );
};

export default ReportsContainer;