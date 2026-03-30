import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const AppDrawer = ({
  anchor = "right",   // right/left/top/bottom
  open,
  onClose,
  title = "",
  subtitle = "",
  width = 360,
  height = 320,
  children,
  fields = [],
  footer,
  showNavigator = false,
  currentIndex = 0,
  totalItems = 0,
  navLabel = "",
  onPrev,
  onNext,
  sxContent = {},
  paperSx = {},
  primaryText,
  secondaryText,
  primaryIcon,
  secondaryIcon,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const onVertical = anchor === "left" || anchor === "right";

  const buttonStyle = {
    fontWeight: 600,
    textTransform: "none",
    borderRadius: "8px",
  };
  
  const defaultFooter = (onPrimaryClick || onSecondaryClick) ? (
    <Box sx={{ display: "flex", gap: 1 }}>
      {onSecondaryClick && (
        <Button
          fullWidth
          variant="outlined"
          onClick={onSecondaryClick}
          startIcon={secondaryIcon}
          sx={{
            ...buttonStyle,
            borderColor: "#0e3a46",
            color: "#0e3a46",
            "&:hover": {
              backgroundColor: "rgba(14, 58, 70, 0.04)",
              borderColor: "#0b2c34",
            },
          }}
        >
          {secondaryText}
        </Button>
      )}
      {onPrimaryClick && (
        <Button
          fullWidth
          variant="contained"
          onClick={onPrimaryClick}
          startIcon={primaryIcon}
          sx={{
            ...buttonStyle,
            backgroundColor: "#0e3a46",
            color: "#fff",
            "&:hover": { backgroundColor: "#0b2c34" },
          }}
        >
          {primaryText}
        </Button>
      )}
    </Box>
  ) : null;

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box
        sx={{
          ...(onVertical ? { width } : { height }),
          p: 0,
          display: "flex",
          flexDirection: "column",
          height: onVertical ? "100%" : height,
          ...paperSx,
        }}
      >
        {/* HEADER */}
        <Box sx={{ bgcolor: "#0d3b4f", color: "#fff", p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {subtitle}
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* NAVIGATOR */}
        {showNavigator && totalItems > 0 && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              px: 2,
              py: 1,
              background: "#f5f5f5",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <IconButton
              size="small"
              onClick={onPrev}
              disabled={!onPrev || currentIndex === 0}
              sx={{ color: "#0d3b4f" }}
            
            >
              <ChevronLeftIcon />
            </IconButton>

            <Typography variant="caption" sx={{ fontWeight: 500, color: "#555" }}>
              {navLabel}
            </Typography>

            <IconButton
              size="small"
              onClick={onNext}
              disabled={!onNext || currentIndex >= totalItems - 1}
              sx={{ color: "#0d3b4f" }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        )}

        {/* BODY */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2, ...sxContent }}>
          {fields.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {fields.map((field, idx) => (
                <TextField
                  key={idx}
                  fullWidth
                  label={field.label}
                  value={field.value}
                  onChange={field.onChange}
                  type={field.type || "text"}
                  multiline={field.multiline}
                  rows={field.rows}
                  select={field.select}
                  error={field.error}
                  helperText={field.helperText}
                  InputLabelProps={field.type === "date" ? { shrink: true } : field.InputLabelProps}
                  {...field.textFieldProps}
                >
                  {field.select && field.options?.map((opt) => (
                    <MenuItem key={opt.value || opt} value={opt.value || opt}>
                      {opt.label || opt}
                    </MenuItem>
                  ))}
                </TextField>
              ))}
            </Box>
          ) : (
            children
          )}
        </Box>

        {/* FOOTER */}
        {(footer || defaultFooter) && (
          <Box sx={{ borderTop: "1px solid #e0e0e0", p: 2 }}>
            {footer || defaultFooter}
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default AppDrawer;