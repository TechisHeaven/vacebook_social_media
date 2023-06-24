import React, { useState } from "react";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const NavLinks = ({ ActiveLinkCallback }) => {
  const [isActive, setIsActive] = useState(1);
  let ProfileTabs = [
    {
      TabID: 1,
      TabName: "posts",
    },
    {
      TabID: 2,
      TabName: "about",
    },
    {
      TabID: 3,
      TabName: "friends",
    },
    {
      TabID: 4,
      TabName: "photos",
    },
  ];
  return (
    <>
      <div className="w-full flex flex-row max-w-[1218px] px-4 bg-white py-2">
        <ul className="flex flex-row gap-1 justify-start items-start w-full h-full">
          {ProfileTabs.map((value, index) => {
            return (
              <li className="flex justify-center" key={value.TabID}>
                <Button
                  onClick={() => {
                    setIsActive(value.TabID), ActiveLinkCallback(value.TabID);
                  }}
                  style={
                    isActive == value.TabID
                      ? { color: "hsl(214, 89%, 52%)", borderBottom: "3px solid #1B74E4", borderRadius: 0 }
                      : { color: "rgba(128, 128 , 128, 1",borderBottom: "3px solid transparent", borderRadius: "5px" }
                  }
                  className="w-[80px] py-1 pt-2 h-[50px] flex justify-center border-b-2 transition-all"
                >
                  <p className="font-bold capitalize">{value.TabName}</p>
                </Button>
              </li>
            );
          })}
        </ul>
        <Button
          variant="contained"
          sx={{
            maxWidth: "50px",
            maxHeight: "40px",
            borderRadius: "10px",
            background: "rgba(128, 128, 128, 0.2)",
            color: "black",
            minWidth: "30px",
            minHeight: "30px",
            ":hover": { background: "rgba(128, 128, 128, 0.2)" },
          }}
        >
          <MoreHorizIcon fontSize="small" />
        </Button>
      </div>
    </>
  );
};

export default NavLinks;
