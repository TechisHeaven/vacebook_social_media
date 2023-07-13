import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button } from "@mui/material";
import { useStateContext } from "../../../../state";

const PhotoCon = () => {

  let state = useStateContext();
  const {posts}  = state.posts;

  return (
    <>
      <div className="wrapper bg-white w-full p-4 rounded-lg shadow-md gap-6 flex flex-col">
        <div className="flex flex-wrap justify-between">
        <h1 className="font-bold text-xl">Photos</h1>
        <Button ><p className="font-bold text-sm">Add photo/video</p> </Button>
        </div>
        <div className="items flex flex-wrap gap-4">
          {posts.map((value) => {
            return (
                <div className="item rounded-lg overflow-hidden relative" key={value._id}>
                  <img
                    className="w-[185px]"
                    src={import.meta.env.VITE_PUBLIC_IMAGE_FOLDER + value.postImg}
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
