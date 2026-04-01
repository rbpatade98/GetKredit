import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Chip,
  Typography,
  IconButton,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import SearchBar from "../components/common/SearchBar";
import CustomDataGrid from "../components/common/CustomDataGrid";
import CommonModal from "../components/common/CommonModal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { EditOutlined } from "@mui/icons-material";
import AppDrawer from "../components/common/AppDrawer";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  fetchRecycleBinData,
  updateRecycleBinRow,
  deleteRecycleBinRow,
} from "../store/slices/recycleBinSlice";

/*
const initialRows = [
  {
    id: 1,
    name: "John",
    role: "Developer",
    employeeNo: "E001",
    JoinningDate: "2020-01-01",
    DeletedDate: "2024-01-01",
  },
  {
    id: 2,
    name: "Jane",
    role: "Designer",
    employeeNo: "E002",
    JoinningDate: "2019-05-15",
    DeletedDate: "2024-02-01",
  },
  {
    id: 3,
    name: "Bob",
    role: "Manager",
    employeeNo: "E003",
    JoinningDate: "2018-03-20",
    DeletedDate: "2024-03-01",
  },
  {
    id: 4,
    name: "Alice",
    role: "QA Engineer",
    employeeNo: "E004",
    JoinningDate: "2021-07-10",
    DeletedDate: "2024-04-01",
  },
  {
    id: 5,
    name: "Tom",
    role: "Support",
    employeeNo: "E005",
    JoinningDate: "2017-11-30",
    DeletedDate: "2024-05-01",
  },
];
*/

const RecycleBinContainer = () => {
  // const [rows, setRows] = useState(initialRows);
  const dispatch = useDispatch();
  const { rows, loading } = useSelector((state) => state.recycleBin);

  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditConfirmOpen, setIsEditConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    roles: "",
    name: "",
    employeeNo: "",
    joiningDate: "",
    deletedDate: "",
  });
  const [editData, setEditData] = useState({
    name: "",
    roles: "",
    employeeNo: "",
    JoinningDate: "",
    DeletedDate: "",
  });

  useEffect(() => {
    dispatch(fetchRecycleBinData());
  }, [dispatch]);

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.roles.toLowerCase().includes(search.toLowerCase()) ||
      row.employeeNo.toLowerCase().includes(search.toLowerCase());

    const matchesFilters =
      (filters.name === "" ||
        row.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.roles === "" ||
        row.roles.toLowerCase().includes(filters.roles.toLowerCase())) &&
      (filters.employeeNo === "" ||
        row.employeeNo
          .toLowerCase()
          .includes(filters.employeeNo.toLowerCase())) &&
      (filters.joiningDate === "" ||
        row.JoinningDate === filters.joiningDate) &&
      (filters.deletedDate === "" || row.DeletedDate === filters.deletedDate);

    return matchesSearch && matchesFilters;
  });

  // Step 1: Open edit drawer with pre-filled data
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditData({
      name: row.name,
      roles: row.roles,
      employeeNo: row.employeeNo,
      JoinningDate: row.JoinningDate,
      DeletedDate: row.DeletedDate,
    });
    setIsEditDrawerOpen(true);
  };

  // Step 2: Save clicked in drawer → close drawer, open confirm modal
  const handleEditSave = () => {
    setIsEditDrawerOpen(false);
    setIsEditConfirmOpen(true);
  };

  // Step 3: Confirmed in modal → apply changes to row
  const confirmEdit = () => {
    if (selectedRow) {
      //   setRows((prev) =>
      //   prev.map((r) => (r.id === selectedRow.id ? { ...r, ...editData } : r)),
      // );
      dispatch(updateRecycleBinRow({ ...selectedRow, ...editData }));
    }
    setIsEditConfirmOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    // setRows((prev) => prev.filter((r) => r.id !== selecte
    if (selectedRow) {
      dispatch(deleteRecycleBinRow(selectedRow.id));
    }
    setIsDeleteConfirmOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 130 },
    { field: "roles", headerName: "Roles", flex: 1, minWidth: 130 },
    {
      field: "employeeNo",
      headerName: "Employee Number",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "JoinningDate",
      headerName: "Joining Date",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "DeletedDate",
      headerName: "Deleted Date",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(row);
              }}
            >
              <EditOutlined fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(row);
              }}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box
        backgroundColor="#ffffff"
        p={2}
        borderRadius={2}
        mb={3}
        boxShadow={1}
      >
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Recycle Bin</Typography>
          <Chip
            label={`${rows.length} Employees`}
            sx={{ backgroundColor: "#E5F7FF", color: "#0F4C5C" }}
            size="small"
          />
        </Box>
        <Typography variant="body2" color="textSecondary">
          See all the employees here which has been deleted, you may restore
          them anytime.
        </Typography>
        <hr />

        {/* Search & Filter */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{ mt: 1, mb: 1 }}
        >
          <SearchBar
            placeholder="Search employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "100%", maxWidth: 430, height: "40px" }}
          />
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "#ffffff",
                color: "#0e3945",
                border: "1px solid #d9e3ed",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                py: 1,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#0e3945",
                  color: "#ffffff",
                  borderColor: "#0e3945",
                  boxShadow: "none",
                },
              }}
            >
              Add Filters
            </Button>
            {loading && (
              <CircularProgress size={24} sx={{ color: "#0e3945", mt: 1 }} />
            )}
          </Box>
        </Box>

        {/* Filter Drawer */}
        <AppDrawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          title="Add Filters"
          subtitle="See data in organized manner"
          width={420}
          onPrimaryClick={() => setOpen(false)}
          onSecondaryClick={() =>
            setFilters({
              roles: "",
              name: "",
              employeeNo: "",
              joiningDate: "",
              deletedDate: "",
            })
          }
          primaryText="Apply"
          secondaryText="Clear all"
          fields={[
            {
              label: "Roles",
              value: filters.roles,
              onChange: (e) =>
                setFilters({ ...filters, roles: e.target.value }),
            },
            {
              label: "Name",
              value: filters.name,
              onChange: (e) => setFilters({ ...filters, name: e.target.value }),
            },
            {
              label: "Employee number",
              value: filters.employeeNo,
              onChange: (e) =>
                setFilters({ ...filters, employeeNo: e.target.value }),
            },
            {
              label: "Joining date",
              value: filters.joiningDate,
              onChange: (e) =>
                setFilters({ ...filters, joiningDate: e.target.value }),
              type: "date",
            },
            {
              label: "Date of delete",
              value: filters.deletedDate,
              onChange: (e) =>
                setFilters({ ...filters, deletedDate: e.target.value }),
              type: "date",
            },
          ]}
        />

        {/* Edit Drawer */}
        <AppDrawer
          anchor="right"
          open={isEditDrawerOpen}
          onClose={() => setIsEditDrawerOpen(false)}
          title="Edit Employee"
          subtitle="Update the employee details below"
          width={420}
          onPrimaryClick={handleEditSave}
          onSecondaryClick={() => setIsEditDrawerOpen(false)}
          primaryText="Save"
          secondaryText="Cancel"
          fields={[
            {
              label: "Name",
              value: editData.name,
              onChange: (e) =>
                setEditData({ ...editData, name: e.target.value }),
            },
            {
              label: "Roles",
              value: editData.roles,
              onChange: (e) =>
                setEditData({ ...editData, roles: e.target.value }),
            },
            {
              label: "Employee Number",
              value: editData.employeeNo,
              onChange: (e) =>
                setEditData({ ...editData, employeeNo: e.target.value }),
            },
            {
              label: "Joining Date",
              value: editData.JoinningDate,
              onChange: (e) =>
                setEditData({ ...editData, JoinningDate: e.target.value }),
              type: "date",
            },
            {
              label: "Deleted Date",
              value: editData.DeletedDate,
              onChange: (e) =>
                setEditData({ ...editData, DeletedDate: e.target.value }),
              type: "date",
            },
          ]}
        />

        <hr />

        {/* Data Grid */}
        <CustomDataGrid
          rows={filteredRows}
          columns={columns}
          checkboxSelection
          autoHeight
          disableColumnMenu
          sortingOrder={[]}
          loading={loading}
        />
      </Box>

      {/* Edit Confirm Modal */}
      <CommonModal
        open={isEditConfirmOpen}
        onClose={() => setIsEditConfirmOpen(false)}
        title="Are you sure you want to edit this user?"
        description={`By clicking on yes you are making sure you want to edit ${selectedRow?.name}.`}
        confirmText="Yes, edit"
        cancelText="No"
        onConfirm={confirmEdit}
      />

      {/* Delete Confirm Modal */}
      <CommonModal
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="Are you sure you want to delete this user?"
        description={`By clicking on yes you are making sure you want to delete ${selectedRow?.name}.`}
        confirmText="Yes, delete"
        cancelText="No"
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default RecycleBinContainer;
