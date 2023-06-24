import { Avatar } from "@mui/material";
import React, { useState } from "react";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import AddPostModal from "./AddPostModal";

const AddPostContainer = ({user}) => {

       
 const [open, setOpen] = React.useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);




  return (
    <>
      <div className="flex flex-row justify-between bg-white p-4 rounded-lg items-center gap-2">
        <Avatar src={"http://localhost:3000/public/user/images/"+user.pic}>{user.name}</Avatar>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full bg-gray-100 rounded-full p-2 px-4 placeholder:text-gray-600"
        />
        <div className="flex flex-row gap-2 hover:bg-gray-200 py-2 px-4 rounded-xl cursor-pointer" onClick={()=>handleOpen()}>
          <AddToPhotosRoundedIcon color="success" />
          <p>Photo/video</p>
        </div>
        <AddPostModal handleClose={handleClose} user={user} open={open}/>
      </div>
    </>
  );
};

export default AddPostContainer;
