import React, { useContext, useRef, useState } from "react";
import { Avatar, Button, Popover, Tooltip, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import Notification from "./Notification";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatchContext, useStateContext } from "../../state";

const Header = () => {
  let searchBox = useRef();
  const dispatch = useDispatchContext();
  const state = useStateContext();
  const location = useNavigate();
  let { user } = state.user;
  let { friendRequests } = state.friendRequests;

  const logoutuser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    location("/login");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [Search, setSearch] = useState("");
  const handleSearchClick = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      location("search/" + Search);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickNotification = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosekNotification = () => {
    setAnchorEl2(null);
  };

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const id = open ? "simple-popover" : undefined;
  const id2 = open2 ? "simple-popover" : undefined;

  return (
    <>
      <div className="bg-white w-full h-[56px]  shadow-sm sticky top-0 z-50">
        <div className="navWrapper flex flex-row px-5 py-1 justify-between items-center relative max-md:gap-2">
          <Link to="/" className="flex flex-row gap-2">
            {/* <FacebookRoundedIcon style={{ fontSize: "50px", color: "#1b74e4"}} /> */}
            <img src="/logo.png" className="w-[40px]" alt="" />
            <input
              type="text"
              className="bg-[#F0F2F5] text-base outline-none px-2 rounded-full h-[40px] w-[240px] max-sm:max-w-[120px] max-md:flex transition-all left-[65px] max-sm:placeholder:text-sm"
              placeholder="Search Vacebook"
              onChange={(e) => handleSearchClick(e)}
              onKeyDown={(e) => handleSearch(e)}
              ref={searchBox}
            />
          </Link>
          {/* max-lg:fixed max-lg:bottom-2 max-lg:bg-white max-lg:p-2 max-lg:rounded-md max-lg:left-0 max-lg:w-full */}
          <div className="navitems flex items-center justify-center w-[680px] max-lg:w-full max-sm:shadow-xl bottom-4 max-sm:fixed max-sm:bottom-0 max-sm:bg-white max-sm:p-2 max-sm:rounded-md max-sm:left-0">
            <ul className="flex flex-row gap-1 justify-between w-full h-full">
              <li className="w-full flex justify-center">
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "w-[100px] max-2md:w-[50px] py-1 pt-2 h-[50px]  px-8 flex justify-center text-[#1B74E4] border-b-[#1B74E4] border-b-2 transition-all"
                      : "w-[100px] max-2md:w[50px] px-8 pt-2 py-1 h-[50px] flex justify-center hover:bg-gray-100 rounded-lg text-gray-500"
                  }
                >
                  <Tooltip title="Home">
                    <HomeRoundedIcon style={{ fontSize: "30px" }} />
                  </Tooltip>
                </NavLink>
              </li>
              <li className="w-full flex justify-center">
                <NavLink
                  to={"/profile/" + user._id}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "w-[100px] max-2md:w-[50px] py-1 pt-2 h-[50px]  px-8 flex justify-center text-[#1B74E4] border-b-[#1B74E4] border-b-2 transition-all"
                      : "w-[100px] max-2md:w-[50px]  px-8 pt-2 py-1 h-[50px] flex justify-center hover:bg-gray-100 rounded-lg text-gray-500"
                  }
                >
                  <Tooltip title="Profile">
                    <Person2OutlinedIcon style={{ fontSize: "30px" }} />
                  </Tooltip>
                </NavLink>
              </li>
              <li className="w-full flex justify-center">
                <NavLink
                  to="/friends"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "w-[100px] max-2md:w-[50px] py-1 pt-2 h-[50px] px-8 flex justify-center text-[#1B74E4] border-b-[#1B74E4] border-b-2 transition-all"
                      : "w-[100px] max-2md:w-[50px]  px-8 pt-2 py-1 h-[50px] flex justify-center hover:bg-gray-100 rounded-lg text-gray-500"
                  }
                >
                  <Tooltip title="Friends">
                    <PeopleAltOutlinedIcon style={{ fontSize: "30px" }} />
                  </Tooltip>
                </NavLink>
              </li>
              <li className="w-full flex justify-center">
                <NavLink
                  to="/marketplace"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "w-[100px] max-2md:w-[50px] py-1 pt-2 h-[50px]  px-8 flex justify-center text-[#1B74E4] border-b-[#1B74E4] border-b-2 transition-all"
                      : "w-[100px] max-2md:w-[50px]  px-8 pt-2 py-1 h-[50px] flex justify-center hover:bg-gray-100 rounded-lg text-gray-500"
                  }
                >
                  <Tooltip title="Store">
                    <StoreOutlinedIcon style={{ fontSize: "30px" }} />
                  </Tooltip>
                </NavLink>
              </li>
              <li className="w-full flex justify-center">
                <NavLink
                  to="/ss"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "w-[100px] max-2md:w-[50px] py-1 pt-2 h-[50px]  px-8 flex justify-center text-[#1B74E4] border-b-[#1B74E4] border-b-2 transition-all"
                      : "w-[100px] max-2md:w-[50px]  px-8 pt-2 py-1 h-[50px] flex justify-center hover:bg-gray-100 rounded-lg text-gray-500"
                  }
                >
                  <Tooltip title="Bookmark">
                    <BookmarkBorderOutlinedIcon style={{ fontSize: "30px" }} />
                  </Tooltip>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <div className="MessageIcon relative p-2 bg-gray-200 rounded-full">
              <Link to="/messenger">
                <ChatIcon />
              </Link>
            </div>
            <div className="notificationIcon relative p-2 bg-gray-200 rounded-full">
              {friendRequests.length > 0 && (
                <div className="noti-indicator animate-pulse absolute -right-2 -bottom-2 bg-red-600 text-white p-2 h-6 flex items-center justify-end rounded-full">
                  {friendRequests.length}
                </div>
              )}

              <NotificationsIcon onClick={handleClickNotification} />

              <Popover
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                onClose={handleClosekNotification}
                style={{ top: "12px" }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  component={"span"}
                  sx={{
                    display: "flex",
                    minWidth: "380px",
                    transition: ".2s all ease",
                  }}
                >
                  <Link to="/" className="flex flex-col gap-2 justify-start">
                    <h1 className="font-bold text-xl pl-4 py-4">
                      Notifications
                    </h1>
                    <Notification />
                  </Link>
                </Typography>
              </Popover>
              {/* popover end  */}
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
              <div className="flex gap-2 cursor-pointer items-center justify-start transition-all hover:bg-[#e5e7eb] w-[350px] p-2 rounded-lg">
                <div className="p-2 flex items-center justify-center bg-gray-300 rounded-full">
                  <AddToPhotosRoundedIcon fontSize="small" />
                </div>
                <p className="font-semibold">Post</p>
              </div>
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
    </>
  );
};

export default Header;
