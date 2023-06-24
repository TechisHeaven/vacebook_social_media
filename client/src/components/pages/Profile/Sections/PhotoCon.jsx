import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button } from "@mui/material";

const PhotoCon = () => {
  let ImgData = [
    {
      Id: 1,
      ImgUrl: "/profilePic.jpg",
    },
    {
      Id: 2,
      ImgUrl: "/profilePic.jpg",
    },
    {
      Id: 3,
      ImgUrl: "/profilePic.jpg",
    },
    {
      Id: 4,
      ImgUrl: "/profilePic.jpg",
    },
    {
      Id: 5,
      ImgUrl: "/profilePic.jpg",
    },
  ];
  return (
    <>
      <div className="wrapper bg-white w-full p-4 rounded-lg shadow-md gap-6 flex flex-col">
        <div className="flex flex-wrap justify-between">
        <h1 className="font-bold text-xl">Photos</h1>
        <Button ><p className="font-bold text-sm">Add photo/video</p> </Button>
        </div>
        <div className="items flex flex-wrap gap-4">
          {ImgData.map((value) => {
            return (
                <div className="item rounded-lg overflow-hidden relative" key={value.Id}>
                  <img
                    className="w-[185px]"
                    src={value.ImgUrl}
                    alt="photo"
                  />
                  <div className="edit absolute z-10 top-2 right-2 p-2 bg-black/40 text-white rounded-full">
                    <EditRoundedIcon />
                  </div>
                </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PhotoCon;
