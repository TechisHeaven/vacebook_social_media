import React, { useState } from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
const Sidebar = ({ ActiveLinkCallback }) => {
  const [isActive, setIsActive] = useState(1);

  return (
    <>
      <div className="Sidebar wrapper bg-white w-[360px] p-2 gap-2 flex flex-col h-full fixed shadow-md">
        <div className="heading font-bold text-2xl px-2">Friends</div>
        <div className="Tabs">
          <div
            className={
              isActive == 1
                ? "flex p-2 w-full bg-gray-200 rounded-md items-center gap-4"
                : "flex p-2 w-full transition-all hover:bg-gray-200 rounded-md items-center gap-4"
            }
            onClick={() => {
              setIsActive(1), ActiveLinkCallback(1);
            }}
          >
            <div
              className={
                isActive == 1
                  ? "p-2 flex items-center justify-center bg-blue-500 text-white rounded-full"
                  : "p-2 flex items-center justify-center text-black bg-gray-200 rounded-full"
              }
            >
              <GroupIcon />
            </div>
            <p className="font-semibold text-lg">Home</p>
          </div>
          <div
            className={ isActive == 2
                ? "flex p-2 w-full bg-gray-200 rounded-md items-center gap-4"
                : "flex p-2 w-full transition-all hover:bg-gray-200 rounded-md items-center gap-4"
            }
            onClick={() => {
              setIsActive(2), ActiveLinkCallback(2);
            }}
          >
            <div
              className={
                isActive == 2
                  ? "p-2 flex items-center justify-center bg-blue-500 text-white rounded-full"
                  : "p-2 flex items-center justify-center text-black bg-gray-200 rounded-full"
              }
            >
              <PersonAddIcon />
            </div>
            <p className="font-semibold text-lg">Friend requests</p>
          </div>
          <div
            className={ isActive == 3
                ? "flex p-2 w-full bg-gray-200 rounded-md items-center gap-4"
                : "flex p-2 w-full transition-all hover:bg-gray-200 rounded-md items-center gap-4"
            }
            onClick={() => {
              setIsActive(3), ActiveLinkCallback(3);
            }}
          >
            <div
              className={
                isActive == 3
                  ? "p-2 flex items-center justify-center bg-blue-500 text-white rounded-full"
                  : "p-2 flex items-center justify-center text-black bg-gray-200 rounded-full"
              }
            >
              <PersonIcon />
            </div>
            <p className="font-semibold text-lg">All Friends</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
