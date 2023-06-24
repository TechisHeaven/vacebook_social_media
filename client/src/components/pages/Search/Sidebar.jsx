import React, { useState } from 'react'
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Sidebar = ({ActiveLinkCallback}) => {
    
  const [isActive, setIsActive] = useState(1);


  return (
    <>
      <div className="Sidebar wrapper bg-white w-[360px] min-w-[360px] p-2 gap-2 flex flex-col h-full fixed shadow-md">
        <div className="heading font-bold text-2xl px-2">Search results</div>
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
            <p className="font-semibold text-lg">All</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
