import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const CommonModal = ({
  open = false,
  onClose = () => {},
  title = "Confirm",
  description = "",
  children,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  icon = <WarningAmberOutlinedIcon sx={{ fontSize: 30, color: "#FFAA00" }} />,
  iconColor = "#FFAA00",
  maxWidth = "xs",
  fullWidth = true,
  hideActions = false,
  actions,
  sx = {},
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2,
          height: 250,
          ...sx,
        },
      }}
    >
      {icon && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          {React.isValidElement(icon) ? (
            icon
          ) : (
            <WarningAmberOutlinedIcon sx={{ fontSize: 30, color: iconColor }} />
          )}
        </Box>
      )}

      {title && (
        <DialogTitle sx={{ textAlign: "center", fontWeight: 600, fontSize : 18 }}>
          {title}
        </DialogTitle>
      )}

      <DialogContent>
        {description && (
          <Typography
            align="center"
            color="text.secondary"
            sx={{ marginBottom: children ? 2 : 0, fontSize: 12 }}
          >
            {description}
          </Typography>
        )}
        {children}
      </DialogContent>

      {!hideActions && (
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          {actions ? (
            actions
          ) : (
            <>
               <Button
                variant="outlined"
                onClick={onClose}
                sx={{height: "45px", width: "45%", border: "1px solid #0e3a46", color: "#0e3a46", borderRadius:"8px", fontSize: 12, fontWeight: 600 }}
            >
    {cancelText}
  </Button>
  <Button
    variant="contained"
    onClick={onConfirm}
    sx={{height: "45px", width: "45%", backgroundColor: "#0e3a46", borderRadius:"8px",fontSize: 12, fontWeight: 600 }}
  >
    {confirmText}
  </Button>
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CommonModal;
