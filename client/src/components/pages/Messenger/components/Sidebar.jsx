import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";

const Sidebar = ({onTileSelect,selectedTile}) => {
  let users = [
    {
      _id: "1",
      userName: "John Wick",
      userPic: "https://random.imagecdn.app/500/150",
      CreatedAt: "02:22",
      UpdateAt: "2 min now",
    },
    {
      _id: "2",
      userName: "Raj Kumar",
      userPic: "https://random.imagecdn.app/500/150",
      CreatedAt: "12:20",
      UpdateAt: "1 hour ago",
    },
    {
      _id: "3",
      userName: "Chris Smith",
      userPic: "https://random.imagecdn.app/500/150",
      CreatedAt: "10:20",
      UpdateAt: "12 min ago",
    },
    {
      _id: "4",
      userName: "Akshay Deol",
      userPic: "https://random.imagecdn.app/500/150",
      CreatedAt: "04:50",
      UpdateAt: "5 min ago",
    },
  ];


  return (
    <div className="bg-white min-w-[344px]  h-[calc(100vh-56px)]">
      <div className="wrapper flex flex-col gap-4">
        <div className="search flex items-center px-6 justify-between text-gray-400">
          <SearchIcon fontSize="small" />
          <input
            type="text"
            placeholder="Search Messanger"
            className="p-2 w-full outline-none text-gray-600"
          />
        </div>
        <div className="userTiles flex flex-col gap-2 relative">
          {users.map((value) => {
           

            return (
              <div key={value._id} onClick={() => onTileSelect(value._id)} className={`tile transition-all flex items-center w-full justify-between cursor-pointer px-4 py-2 ${selectedTile === value._id ? "bg-gray-100" : ""}`}>
                <div className="left flex gap-2">
                  <Avatar src={value.userPic}>H</Avatar>
                  <div className="title">
                    <h1 className="font-semibold">{value.userName}</h1>
                    <p className="text-gray-400 text-sm">When are you coming</p>
                  </div>
                </div>
                <div className="time text-gray-400">{value.UpdateAt}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
