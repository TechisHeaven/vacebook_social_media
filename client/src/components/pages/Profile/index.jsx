import { Avatar, Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Banner from "./Banner";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import NavLinks from "./NavLinks";
import ProfilePost from "./ProfilePost";
import PhotosContainer from "./PhotosContainer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FriendsContainer from "./Sections/FriendsContainer";
import AddPostContainer from "../../utils/AddPostContainer";
import AboutCon from "./aboutCon";
import FriendSec from "./Sections/FriendSec";
import PhotoCon from "./Sections/PhotoCon";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatchContext, useStateContext } from "../../../state";
import UserModal from "./utils/userModal";

const index = () => {
  const [ProfileImg, SetProfileImg] = useState({});
  const dispatch = useDispatchContext();
  const state = useStateContext();
  let { user } = state.user;
  let { posts } = state.posts;

  let location = useNavigate();
  let inputAvatar = useRef();
  const handleImageAvatar = () => {
    inputAvatar.current.click();
  };

  //user Modal

  const [openUser, setOpenUser] = React.useState(false);
  const handleOpen = () => setOpenUser(true);
  const handleClose = () => setOpenUser(false);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    let token = localStorage.getItem("token");

    // Create a FormData object
    const formData = new FormData();
    formData.append("_id", userData._id);
    formData.append("pic", e.target.files[0]);

    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .put("http://localhost:3000/api/user/update/pic", formData, config)
      .then((response) => {
        if (response.status == 201 || statusText == "Created") {
          let user = localStorage.getItem("user");
          user = JSON.parse(user);
          fetch(`http://localhost:3000/api/user/${user._id}`, {
            method: "get",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("user", JSON.stringify(data.user));
              dispatch({ type: "UPDATE_USER", payload: data.user });
            });
        }
      })
      .catch((error) => {
        if (error.status == 401) {
          console.log("Error", error.message);
        }
      });
  };

  const [activeCompo, setactiveCompo] = useState(1);
  document.title = "Profile | Facebook";
  return (
    <>
      <UserModal openUser={openUser} handleClose={handleClose}/>
      <div className="wrapper flex flex-col w-full items-center justify-center h-full">
        <div className="profile w-full justify-center items-center flex bg-white flex-col">
          <Banner user={user} />
          <div className="profile flex w-full items-end justify-between max-w-[1218px] px-4 bg-white pb-8 border-b-2">
            <div className="flex gap-2 items-center">
              <div
                className="-mt-16 focus:scale-50 w-[180px] border-2 rounded-full relative"
                onClick={handleImageAvatar}
              >
                <Avatar
                  src={"http://localhost:3000/public/user/images/" + user.pic}
                  sx={{
                    aspectRatio: "1/1",
                    height: "100%",
                    width: "100%",
                  }}
                />
                <input
                  type="file"
                  onChange={(e) => {
                    handleSubmit(e);
                  }}
                  ref={inputAvatar}
                  className="hidden"
                />
                <div className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full">
                  <CameraAltRoundedIcon />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p>{user.friends.length > 0 ? user.friends.length : 0} friends</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="contained"
                style={{
                  background: "#1B74E4",
                  boxShadow: 0,
                  textTransform: "capitalize",
                  padding: ".4rem .5rem",
                }}
                className="flex gap-1"
              >
                <AddIcon fontSize="small" />
                <p className="text-[.9rem] font-semibold">Add to Story</p>
              </Button>
              <Button
                variant="contained"
                style={{
                  color: "black",
                  background: "rgba(128, 128, 128, .2)",
                  boxShadow: "0px",
                  textTransform: "capitalize",
                  padding: ".4rem .5rem",
                }}
                className="flex gap-1"
                onClick={()=>{handleOpen()}}
              >
                <EditIcon fontSize="small" />
                <p className="text-[.9rem] font-semibold">Edit Profile</p>
              </Button>
              <Button
                variant="contained"
                style={{
                  color: "black",
                  background: "rgba(128, 128, 128, .2)",
                  boxShadow: "0px",
                  textTransform: "capitalize",
                  padding: ".4rem 0rem",
                }}
              >
                <ExpandMoreIcon />
              </Button>
            </div>
          </div>
          <NavLinks ActiveLinkCallback={setactiveCompo} />
        </div>

        <div className="flex flex-row max-w-[1218px] w-full justify-between p-4">
          {activeCompo == 1 ? (
            <div className="flex gap-4 flex-row">
              <div className="flex gap-4 flex-col">
                <PhotosContainer posts={posts} />
                <FriendsContainer user={user} />
              </div>
              <div className="flex gap-4 flex-col">
                <AddPostContainer user={user} />
                <ProfilePost />
              </div>
            </div>
          ) : null}
          {activeCompo == 2 ? (
            <div className="flex gap-4 flex-row">
              <AboutCon handleOpen={handleOpen}/>
            </div>
          ) : null}
          {activeCompo == 3 ? (
            <div className="flex gap-4 flex-row">
              <FriendSec />
            </div>
          ) : null}
          {activeCompo == 4 ? (
            <div className="flex gap-4 flex-row w-full">
              <PhotoCon />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default index;
