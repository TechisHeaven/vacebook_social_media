import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../Banner";
import { Avatar, Button } from "@mui/material";
import { useStateContext } from "../../../../state";
import NavLinks from "../NavLinks";
import PhotosContainer from "../PhotosContainer";
import FriendsContainer from "../Sections/FriendsContainer";
import ProfilePost from "../ProfilePost";
import AboutCon from "../aboutCon";
import FriendSec from "../Sections/FriendSec";
import PhotoCon from "../Sections/PhotoCon";
import axios from "axios";

const index = () => {
  const [activeCompo, setactiveCompo] = useState(1);
  const { id } = useParams();
  const [user, setUser] = useState([]);
//   const [page, setPage] = useState(0);
//   let state = useStateContext();
  // let {posts} = state.posts;
  //   //scroll event listener
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       if (
  //         window.innerHeight + document.documentElement.scrollTop !==
  //         document.documentElement.offsetHeight
  //       )
  //         return;
  //       setPage((page) => page + 1);
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);

  const handleImageAvatar = () => {
    console.log("Image open modal preview");
  };

  const fetchUser = async () => {
    await axios
      .get(`http://localhost:3000/api/user/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
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
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p>
                {user?.friends?.length > 0 ? user.friends.length : 0} friends
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red-200 w-full place-items-center grid h-52 font-medium text-xl">Working on it 😊</div>
      </div>
    </div>
  );
};

export default index;
