import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function CustomDataGrid({
  rows,
  columns,
  pageSize = 5,
  restProps
}) {
  return (
    <Box sx={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns.map((col) => ({ ...col, sortable: false }))}
        pageSizeOptions={[pageSize]}
        initialState={{ 
          pagination: {
            paginationModel: { pageSize },
          },
        }}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        sortingOrder={[]}
        {...restProps}
      />
    </Box>
  );
}