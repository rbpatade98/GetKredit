import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const KPICard = ({
  title,
  count,
  bgColor,
  borderColor,
  lineColor,
  subtitle,
}) => {
  return (
    <Card
      sx={{
        minWidth: 220,
        minHeight: 120,
        flex: "0 0 auto", // prevent full width
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 2,
        boxShadow: 2,
        transition: "0.3s",
        gap: 1,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          
          {/* Left */}
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>

            <Typography variant="h5" fontWeight="bold">
              {count}
            </Typography>

            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>

          {/* Right Graph */}
          <svg width="80" height="50" viewBox="0 0 100 50">
            <path
              d="M0 35 Q 20 5, 40 30 T 80 25"
              fill="none"
              stroke={lineColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

        </Box>
      </CardContent>
    </Card>
  );
};

export default KPICard;