import { useState } from "react";
import {
  Box, Typography, Chip, Divider, Button, IconButton, Avatar, TextField
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchBar from "../components/common/SearchBar";
import CustomDataGrid from "../components/common/CustomDataGrid";
import AppDrawer from "../components/common/AppDrawer";
import CommonModal from "../components/common/CommonModal";

const reportData = {
  1: {
    columns: [
      {
        field: "name", headerName: "Lead name", flex: 1, minWidth: 160,
        renderCell: (params) => (
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar src={params.row.avatar} sx={{ width: 32, height: 32 }} />
            <Typography variant="body2">{params.value}</Typography>
          </Box>
        ),
      },
      { field: "creationDate",   headerName: "Lead creation date", flex: 1, minWidth: 160 },
      { field: "contactPerson",  headerName: "Contact person",     flex: 1, minWidth: 140 },
      { field: "designation",    headerName: "Designation",        flex: 1, minWidth: 120 },
      {
        field: "contactDetails", headerName: "Contact details", flex: 1, minWidth: 200,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2">{params.row.phone}</Typography>
            <Typography variant="body2" color="text.secondary">{params.row.email}</Typography>
          </Box>
        ),
      },
      { field: "region",   headerName: "Region",   flex: 1, minWidth: 100 },
      { field: "location", headerName: "Location", flex: 1, minWidth: 120 },
    ],
    rows: [
      { id: 1, name: "Sun Jin-Woo", creationDate: "2023-03-23", contactPerson: "Danish Khan", designation: "Manager",   phone: "566-204-2981", email: "Creola.Ankunding@yahoo.com", region: "North", location: "Mumbai" },
      { id: 2, name: "Sun Jin-Woo", creationDate: "2023-03-23", contactPerson: "Danish Khan", designation: "Assistant", phone: "566-204-2981", email: "Creola.Ankunding@yahoo.com", region: "West",  location: "Mumbai" },
      { id: 3, name: "Sun Jin-Woo", creationDate: "2023-03-23", contactPerson: "Danish Khan", designation: "Assistant", phone: "566-204-2981", email: "Creola.Ankunding@yahoo.com", region: "South", location: "Mumbai" },
      { id: 4, name: "Sun Jin-Woo", creationDate: "2023-03-23", contactPerson: "Danish Khan", designation: "Assistant", phone: "566-204-2981", email: "Creola.Ankunding@yahoo.com", region: "East",  location: "Mumbai" },
      { id: 5, name: "Sun Jin-Woo", creationDate: "2023-03-23", contactPerson: "Danish Khan", designation: "Manager",   phone: "566-204-2981", email: "Creola.Ankunding@yahoo.com", region: "North", location: "Mumbai" },
      { id: 6, name: "Sun Jin-Woo", creationDate: "2023-03-23", contactPerson: "Danish Khan", designation: "Manager",   phone: "566-204-2981", email: "Creola.Ankunding@yahoo.com", region: "North", location: "Mumbai" },
    ],
  },
  2: {
    columns: [
      { field: "leadName",   headerName: "Lead Name",   flex: 1, minWidth: 150 },
      { field: "status",     headerName: "Status",      flex: 1, minWidth: 120 },
      { field: "assignedTo", headerName: "Assigned To", flex: 1, minWidth: 150 },
      { field: "date",       headerName: "Date",        flex: 1, minWidth: 130 },
    ],
    rows: [
      { id: 1, leadName: "Acme Corp",  status: "Open",    assignedTo: "Danish Khan", date: "Mar 23, 2023" },
      { id: 2, leadName: "Beta Ltd",   status: "Closed",  assignedTo: "Sara Ali",    date: "Mar 24, 2023" },
      { id: 3, leadName: "Gamma Inc",  status: "Pending", assignedTo: "Raj Mehta",   date: "Mar 25, 2023" },
      { id: 4, leadName: "Delta Co",   status: "Open",    assignedTo: "Danish Khan", date: "Mar 26, 2023" },
    ],
  },
  3: {
    columns: [
      { field: "account", headerName: "Account", flex: 1, minWidth: 150 },
      { field: "type",    headerName: "Type",    flex: 1, minWidth: 120 },
      { field: "balance", headerName: "Balance", flex: 1, minWidth: 130 },
      { field: "date",    headerName: "Date",    flex: 1, minWidth: 130 },
    ],
    rows: [
      { id: 1, account: "HDFC - 001",  type: "Savings", balance: "₹1,20,000", date: "Mar 23, 2023" },
      { id: 2, account: "ICICI - 002", type: "Current", balance: "₹80,500",   date: "Mar 23, 2023" },
      { id: 3, account: "SBI - 003",   type: "Savings", balance: "₹2,10,000", date: "Mar 23, 2023" },
    ],
  },
  4: {
    columns: [
      { field: "invoiceNo", headerName: "Invoice No", flex: 1, minWidth: 140 },
      { field: "client",    headerName: "Client",     flex: 1, minWidth: 150 },
      { field: "amount",    headerName: "Amount",     flex: 1, minWidth: 120 },
      { field: "status",    headerName: "Status",     flex: 1, minWidth: 120 },
      { field: "date",      headerName: "Date",       flex: 1, minWidth: 130 },
    ],
    rows: [
      { id: 1, invoiceNo: "INV-001", client: "Acme Corp", amount: "₹50,000", status: "Paid",    date: "Mar 23, 2023" },
      { id: 2, invoiceNo: "INV-002", client: "Beta Ltd",  amount: "₹30,000", status: "Pending", date: "Mar 24, 2023" },
      { id: 3, invoiceNo: "INV-003", client: "Gamma Inc", amount: "₹70,000", status: "Paid",    date: "Mar 25, 2023" },
    ],
  },
  5: {
    columns: [
      { field: "bank",        headerName: "Bank",        flex: 1, minWidth: 150 },
      { field: "transaction", headerName: "Transaction", flex: 1, minWidth: 150 },
      { field: "amount",      headerName: "Amount",      flex: 1, minWidth: 120 },
      { field: "date",        headerName: "Date",        flex: 1, minWidth: 130 },
    ],
    rows: [
      { id: 1, bank: "HDFC",  transaction: "Credit", amount: "₹10,000", date: "Mar 23, 2023" },
      { id: 2, bank: "ICICI", transaction: "Debit",  amount: "₹5,000",  date: "Mar 24, 2023" },
      { id: 3, bank: "SBI",   transaction: "Credit", amount: "₹25,000", date: "Mar 25, 2023" },
    ],
  },
};

const SKIP_FIELDS = ["id", "avatar", "phone", "email"];

const emptyFilters = {
  name:          "",
  creationDate:  "",
  contactPerson: "",
  designation:   "",
  contactDetail: "",
  region:        "",
  location:      "",
};

export default function ReportDetailContainer({ report, onBack }) {
  const [search, setSearch]           = useState("");
  const [rows, setRows]               = useState(reportData[report.id]?.rows ?? []);

  // Edit flow
  const [selectedRow, setSelectedRow]         = useState(null);
  const [editData, setEditData]               = useState({});
  const [editDrawerOpen, setEditDrawerOpen]   = useState(false);
  const [editConfirmOpen, setEditConfirmOpen] = useState(false);

  // Filter flow
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters]                   = useState({ ...emptyFilters });
  const [appliedFilters, setAppliedFilters]     = useState({ ...emptyFilters });

  const data = reportData[report.id] ?? { columns: [], rows: [] };

  // ── Filter logic ─────────────────────────────────────────
  const filteredRows = rows.filter((row) => {
    const matchesSearch = Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    );

    const matchesFilters =
      (appliedFilters.name          === "" || String(row.name          ?? "").toLowerCase().includes(appliedFilters.name.toLowerCase())) &&
      (appliedFilters.creationDate  === "" || String(row.creationDate  ?? "") === appliedFilters.creationDate) &&
      (appliedFilters.contactPerson === "" || String(row.contactPerson ?? "").toLowerCase().includes(appliedFilters.contactPerson.toLowerCase())) &&
      (appliedFilters.designation   === "" || String(row.designation   ?? "").toLowerCase().includes(appliedFilters.designation.toLowerCase())) &&
      (appliedFilters.contactDetail === "" || String(row.phone ?? "").toLowerCase().includes(appliedFilters.contactDetail.toLowerCase()) ||
                                             String(row.email ?? "").toLowerCase().includes(appliedFilters.contactDetail.toLowerCase())) &&
      (appliedFilters.region        === "" || String(row.region        ?? "").toLowerCase().includes(appliedFilters.region.toLowerCase())) &&
      (appliedFilters.location      === "" || String(row.location      ?? "").toLowerCase().includes(appliedFilters.location.toLowerCase()));

    return matchesSearch && matchesFilters;
  });

  // ── Edit: Step 1 — Edit icon click → open drawer ─────────
  const handleRowClick = (params) => {
    const row = params.row;
    setSelectedRow(row);
    const initial = {};
    Object.keys(row).forEach((key) => {
      if (!SKIP_FIELDS.includes(key)) initial[key] = row[key];
    });
    setEditData(initial);
    setEditDrawerOpen(true);
  };

  // ── Edit: Step 2 — Save → close drawer, open confirm modal
  const handleEditSave = () => {
    setEditDrawerOpen(false);
    setEditConfirmOpen(true);
  };

  // ── Edit: Step 3 — Confirmed → apply changes ─────────────
  const confirmEdit = () => {
    if (selectedRow) {
      setRows((prev) =>
        prev.map((r) => r.id === selectedRow.id ? { ...r, ...editData } : r)
      );
    }
    setEditConfirmOpen(false);
    setSelectedRow(null);
  };

  // ── Filter: Apply ─────────────────────────────────────────
  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setFilterDrawerOpen(false);
  };

  // ── Filter: Clear ─────────────────────────────────────────
  const handleClearFilters = () => {
    setFilters({ ...emptyFilters });
    setAppliedFilters({ ...emptyFilters });
  };

  // ── Action column with Edit icon ──────────────────────────
  const columnsWithEdit = [
    ...data.columns,
    {
      field: "action",
      headerName: "Action",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(e) => { e.stopPropagation(); handleRowClick(params); }}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box backgroundColor="#ffffff" p={2} borderRadius={2} mb={3} boxShadow={1}>

      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton size="small" onClick={onBack}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6">{report.name}</Typography>
          <Chip
            label={`${filteredRows.length} Reports`}
            sx={{ backgroundColor: "#E5F7FF", color: "#0F4C5C" }}
            size="small"
          />
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, ml: 4.5 }}>
        See all the reports here regarding various categories.
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Toolbar */}
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} sx={{ mb: 2 }}>
        <SearchBar
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "100%", maxWidth: 430, height: "40px" }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setFilterDrawerOpen(true)}
          sx={{
            borderColor: "#d9e3ed", color: "#0e3945", textTransform: "none",
            borderRadius: "8px", fontWeight: 600,
            "&:hover": { backgroundColor: "#0e3945", color: "#fff", borderColor: "#0e3945" },
          }}
        >
          Add Filters
        </Button>
      </Box>

      {/* Data Grid */}
      <CustomDataGrid
        rows={filteredRows}
        columns={columnsWithEdit}
        pageSize={5}
        autoHeight
        disableColumnMenu
      />

      {/* ── Edit Drawer ───────────────────────────────────── */}
      <AppDrawer
        anchor="right"
        open={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
        title="Edit Row"
        subtitle="Update the details for the selected record"
        width={420}
        onPrimaryClick={handleEditSave}
        onSecondaryClick={() => setEditDrawerOpen(false)}
        primaryText="Save"
        secondaryText="Cancel"
        fields={Object.keys(editData).map((key) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
          value: editData[key],
          onChange: (e) => setEditData({ ...editData, [key]: e.target.value }),
        }))}
      />

      {/* ── Filter Drawer ─────────────────────────────────── */}
      <AppDrawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        title="Add Filters"
        subtitle="See the data in an organized manner by applying filters"
        width={420}
        onPrimaryClick={handleApplyFilters}
        onSecondaryClick={handleClearFilters}
        primaryText="Apply"
        secondaryText="Clear all"
        fields={[
          { label: "Lead Name", value: filters.name, onChange: (e) => setFilters({ ...filters, name: e.target.value }), textFieldProps: { placeholder: "Search by lead name" } },
          { label: "Lead Creation Date", value: filters.creationDate, onChange: (e) => setFilters({ ...filters, creationDate: e.target.value }), type: "date" },
          { label: "Contact Person", value: filters.contactPerson, onChange: (e) => setFilters({ ...filters, contactPerson: e.target.value }), textFieldProps: { placeholder: "Search by contact person" } },
          { label: "Designation", value: filters.designation, onChange: (e) => setFilters({ ...filters, designation: e.target.value }), textFieldProps: { placeholder: "Search by designation" } },
          { label: "Contact Details", value: filters.contactDetail, onChange: (e) => setFilters({ ...filters, contactDetail: e.target.value }), textFieldProps: { placeholder: "Search by phone or email" } },
          { label: "Region", value: filters.region, onChange: (e) => setFilters({ ...filters, region: e.target.value }), textFieldProps: { placeholder: "Search by region" } },
          { label: "Location", value: filters.location, onChange: (e) => setFilters({ ...filters, location: e.target.value }), textFieldProps: { placeholder: "Search by location" } },
        ]}
      />

      {/* ── Edit Confirm Modal ────────────────────────────── */}
      <CommonModal
        open={editConfirmOpen}
        onClose={() => setEditConfirmOpen(false)}
        title="Are you sure you want to edit this record?"
        description="By clicking yes you are confirming changes to the selected record."
        confirmText="Yes, edit"
        cancelText="No"
        onConfirm={confirmEdit}
      />
    </Box>
  );
}