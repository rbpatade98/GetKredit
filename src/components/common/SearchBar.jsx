import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search",
  sx = { width: 600, margin: "20px" },
  size = "small",
}) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={sx}
      size={size}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
