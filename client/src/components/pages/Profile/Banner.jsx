import { Button } from "@mui/material";
import React, { useRef } from "react";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

const Banner = ({user}) => {

  let inputAvatar = useRef();
  const handleImageAvatar = () => {
    inputAvatar.current.click();
  };


  return (
    <>
      <div className="wrapper max-w-[1218px] w-full relative rounded-lg overflow-hidden">
        <img
          className="h-[450px] bg-center object-cover w-full"
          src={'http://localhost:3000/public/user/images/'+user.pic}
          alt=""
        />
        <div className="absolute bottom-5 right-5">
          <Button onClick={()=>handleImageAvatar()}
            variant="contained"
            style={{
              background: "#000",
              color: "#fff",
              fontSize: ".8rem",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
            className="flex gap-1"
          >
            <CameraAltRoundedIcon fontSize="small"/>
            Edit Cover Photo
            <input type="file" ref={inputAvatar} className="hidden" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Banner;
