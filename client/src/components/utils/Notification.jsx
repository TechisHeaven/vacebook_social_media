import { Chip } from "@mui/material";
import React from "react";
import NotificationLayout from "../Layout/NotificationLayout";

const Notification = () => {
    const handleClick = () => {
        console.info('You clicked the Chip.');
      };
  return (
    <div className="gap-2 flex flex-col">
      <div className="px-4 gap-2 flex">
      <Chip label="All"  style={{color:"#1B74E4", background:'#ECF3FF', fontWeight:'600'}} onClick={handleClick} />
      <Chip label="Unread" variant="outlined" onClick={handleClick} />
      </div>
      <NotificationLayout/>
      <NotificationLayout/>
      <NotificationLayout/>
    </div>
  );
};

export default Notification;
