import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Calender = ({
  events = [],
  onDateClick,
  onEventClick,
  initialDate = new Date(),
  height = "auto",
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        mt: 2,
        border: "1px solid #d9e3ed",
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        borderRadius={2}
        initialDate={initialDate}
        height={height}
        events={events}
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        dateClick={onDateClick}
        eventClick={onEventClick}
        dayCellContent={(arg) => {
          return (
            <div style={{ padding: "4px" }}>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "12px",
                  minHeight: "75px",
                  borderRadius: "4px",
                }}
              >
                {arg.dayNumberText}
              </div>
            </div>
          );
        }}
      />
    </Paper>
  );
};

export default Calender;
