import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Popover } from "@mui/material";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

let data = [
  { userId: 1, ImgUrl: "/profilePic.jpg", Name: "Ranjit Kumar" },
  { userId: 2, ImgUrl: "/profilePic.jpg", Name: "ßűmîť Pãňđîť" },
  { userId: 3, ImgUrl: "/profilePic.jpg", Name: "Sunil Kumar" },
  { userId: 4, ImgUrl: "/profilePic.jpg", Name: "Kriti Verma" },
];

const FriendSec = () => {
  const [friendData, setFriendData] = useState(data);

  const handleSearch = (e) => {
    let search = e.target.value;
    console.log(search);

    if (search.length > 0) {
      // Data filter here
      let result = data
        .filter((value) => {
          return value.Name.toLowerCase()
            .replaceAll("\\s", "")
            .includes(search.toLowerCase());
        })
        .map((value) => {
          return value;
        });
      setFriendData(result);
    } else {
      setFriendData(data);
    }
  };

  // PopOver function

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="wrapper  bg-white w-full rounded-lg min-w-[1218px] p-4 shadow-md">
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-xl">Friends</h1>
            <div className="bg-gray-100 p-2 pl-3 rounded-full shadow-sm">
              <SearchIcon className="text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="bg-gray-100 outline-none pl-2"
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </div>
          <div className="items w-full flex flex-wrap p-2 gap-5">
            {friendData.map((item) => {
              return (
                <div
                  className="item min-w-[573px] flex items-center justify-between pr-4 gap-2"
                  key={item.userId}
                >
                  <div className="flex gap-2 items-center w-full">
                    <div className="w-[80px] aspect-square object-cover rounded-lg overflow-hidden">
                      <img src={item.ImgUrl} alt="friend img" />
                    </div>
                    <div className="heading">
                      <h1 className="text-lg font-semibold">{item.Name}</h1>
                      <span className="text-gray-500">25 mutual friends</span>
                    </div>
                  </div>
                  <div>
                    <MoreHorizIcon
                      aria-describedby={id}
                      variant="contained"
                      onClick={handleClick}
                    />

                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <div className="min-w-[320px] p-2">
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-all cursor-pointer">
                          <PersonRemoveOutlinedIcon />
                          <p className="font-bold">Unfriend</p>
                        </div>
                      </div>
                    </Popover>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendSec;
