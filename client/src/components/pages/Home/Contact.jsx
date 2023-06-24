import React from "react";
import { Link } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Avatar } from "@mui/material";

const Contact = () => {
  return (
    <div className="h-full sticky top-[80px] bg-[#F0F2F5] right-0 z-10 max-2md:hidden">
      <div className="sidebarWrapper px-2 flex flex-col">
        <div className="heading flex flex-row justify-between p-2">
          <h1 className="font-medium text-gray-500 text-lg">Contacts</h1>
          <SearchRoundedIcon style={{fontWeight:"bold" , color: "gray"}} />
        </div>
        <Link to="/profile/asdsad">
          <div className="items flex w-[344px] max-2xl:w-[244px] h-[50px] px-2 p-2 rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
            <div className="itemWrapper flex flex-row justify-start gap-2 items-center">
              <div className="relative">
                <span className="dot absolute w-3 h-3 bg-green-600 border-2 rounded-full border-white bottom-0 right-0 z-[11]" />
                <Avatar
                  src="/profile.jpg"
                  className="rounded-full w-[35px]"
                  alt="profile image"
                />
              </div>
              <h1 className="text-base font-medium">Himanshu verma</h1>
            </div>
          </div>
        </Link>
        <Link to="/profile/asdsad">
          <div className="items flex w-[344px] max-2xl:w-[244px] h-[50px] px-2 p-2 rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
            <div className="itemWrapper flex flex-row justify-start gap-2 items-center">
              <div className="relative">
                {/* <span className="dot absolute w-3 h-3 bg-green-600 border-2 rounded-full border-white bottom-0 right-0 z-[11]" /> */}
                <Avatar
                  src="/profile.jpg"
                  className="rounded-full w-[35px]"
                  alt="profile image"
                />
              </div>
              <h1 className="text-base font-medium">Offline User</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Contact;
