import { Chip } from "@mui/material";
import React from "react";
import NotificationLayout from "../Layout/NotificationLayout";
import { useStateContext } from "../../state";

const Notification = () => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const state = useStateContext();
  const { friendRequests } = state.friendRequests;

  return (
    <div className="gap-2 flex flex-col">
      <div className="px-4 gap-2 flex">
        <Chip
          label="All"
          style={{ color: "#1B74E4", background: "#ECF3FF", fontWeight: "600" }}
          onClick={handleClick}
        />
        <Chip label="Unread" variant="outlined" onClick={handleClick} />
      </div>
      {friendRequests.length > 0 ? (
        friendRequests.map((value) => {
          return <NotificationLayout value={value} key={value._id}/>;
        })
      ) : (
        <div className="p-4">No Notifications</div>
      )}
    </div>
  );
};

export default Notification;
