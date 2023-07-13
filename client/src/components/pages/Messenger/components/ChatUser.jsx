import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";

const ChatUser = ({ onColorTileSelect, selectedColorThemeTile }) => {

  const colorTile = [
    {
      _id: 1,
      name: "blue",
      color: "bg-blue-500",
    },
    {
      _id: 2,
      name: "red",
      color: "bg-red-400",
    },
    {
      _id: 3,
      name: "yellow",
      color: "bg-yellow-400",
    },
    {
      _id: 4,
      name: "purple",
      color: "bg-purple-400",
    },
    {
      _id: 5,
      name: "black",
      color: "bg-black",
    },
    {
      _id: 6,
      name: "green",
      color: "bg-green-400",
    },
    {
      _id: 7,
      name: "gray",
      color: "bg-gray-400",
    },
    {
      _id: 8,
      name: "amber",
      color: "bg-amber-900",
    },
  ];

  return (
    <div className="chatuserinfo min-w-[344px] max-lg:min-w-[240px] p-4 bg-white transition-all">
      <div className="wrapper items-center flex flex-col gap-4">
        <div className="userInfo flex flex-col items-center">
          <Avatar src="./profilePic.jpg" sx={{ width: 65, height: 65 }} />
          <h1 className="font-semibold">Himanshu verma</h1>
          <p className="text-gray-400">New Delhi</p>
          <Link to="/" className="userIdLink text-blue-600 underline">vermaji</Link>
        </div>
        <div className="conwrapper">
          <h1 className="p-2 text-gray-400 capitalize">converstaion color</h1>
          <div className="conv-color flex flex-row flex-wrap gap-2">
            {colorTile.map((value) => {
              return (
                <div
                  key={value._id}
                  className={`colortile cursor-pointer w-[40px] h-[40px] ${value.color} rounded-full grid place-items-center`}
                  onClick={() => {
                    onColorTileSelect(value.color);
                  }}
                >
                  {value.color === selectedColorThemeTile && (
                    <DoneIcon sx={{ color: "white" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
