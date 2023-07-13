import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { Avatar, Popover } from "@mui/material";
import { useStateContext } from "../../../../state";
import LogoutIcon from "@mui/icons-material/Logout";

const MessengerHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const state = useStateContext();
  const { user } = state.user;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div className="bg-white w-full h-[56px]  shadow-sm sticky top-0 z-50">
        <div className="navWrapper flex flex-row px-5 py-1 justify-between items-center relative max-md:gap-2">

            <Link to="/" className="flex flex-row gap-2 items-center">
              <img src="/logo.png" className="w-[40px]" alt="" />
              <p className="font-semibold text-lg">Vacebook</p>
            </Link>

          <div className="flex items-center gap-2">
            <div className="Name relative p-2 font-semibold text-base">
              {user.name}
            </div>
            <Avatar
              className="cursor-pointer"
              onClick={handleClick}
              aria-describedby={id}
              alt="Himanshu"
              src={"http://localhost:3000/public/user/images/" + user.pic}
            />
          </div>
          {/* popover  */}

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            style={{ top: "5px" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="flex min-w-[380px] flex-col p-4 gap-2">
              <Link to={"/profile/" + user._id} className="flex gap-2 flex-col">
                <div className="flex gap-2 items-center justify-start transition-all hover:bg-[#e5e7eb] w-[350px] shadow-md hover:shadow-md p-2 rounded-lg">
                  <Avatar
                    alt="Himanshu"
                    src={"http://localhost:3000/public/user/images/" + user.pic}
                  />
                  <p className="font-semibold">{user.name}</p>
                </div>
              </Link>
              <div
                onClick={() => logoutuser()}
                className="flex gap-2 cursor-pointer  items-center justify-start transition-all hover:bg-[#e5e7eb] w-[350px] shadow-md hover:shadow-md p-2 rounded-lg"
              >
                <div className="p-2 flex items-center justify-center bg-gray-300 rounded-full">
                  <LogoutIcon fontSize="small" />
                </div>
                <p className="font-semibold">Logout</p>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default MessengerHeader;
