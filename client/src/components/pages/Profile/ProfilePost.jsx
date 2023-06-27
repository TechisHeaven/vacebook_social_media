import React, { useContext, useEffect, useState } from "react";
import { Avatar, Link, Popover } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import DeleteIcon from "@mui/icons-material/Delete";
import PostModal from "../../utils/PostModal";
import { useNavigate } from "react-router-dom";
import LikeButton from "../Home/button";
import axios from "axios";
import { useDispatchContext, useStateContext } from "../../../state";
import { toast } from "react-toastify";

const ProfilePost = () => {
  const [Comment, setComment] = useState();
  const [page, setPage] = useState(0);
  const location = useNavigate();
  const state = useStateContext();
  const dispatch = useDispatchContext();

  let { posts } = state.posts;
  let { user } = state.user;

  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const [openPopoverId, setOpenPopoverId] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenPopoverId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopoverId(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setPage((page) => page + 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(false);
      location("/login");
      return;
    }
    dispatch({ type: "RESET_POSTS" });
  }, []);

  const fetchData = async () => {
    try {
      let token = localStorage.getItem("token");
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      dispatch({ type: "FETCH_POSTS_REQUEST" });
      // post fetch
      const data = await fetch(
        `http://localhost:3000/api/post/userpost/${user._id}/${page}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "content-type": "application/json",
          },
          method: "GET",
        }
      ).then((res) => res.json());

      for (let i = 0; i < data.length; i++) {
        // postedUserData fetch here
        let PostedUserId = await data[i].PostUserID;

        const PostedUserData = await fetch(
          `http://localhost:3000/api/user/${PostedUserId}`,
          {
            headers: {
              authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        ).then((res) => res.json());

        data[i].PostUserName = PostedUserData.user.name;
        data[i].PostUserImg = PostedUserData.user.pic;

        if (!localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.parse(PostedUserData));
        }
      }
      dispatch({ type: "FETCH_POSTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_POSTS_FAILURE", payload: error });
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  //handle comment
  const HandleComment = async (post_id) => {
    if (!Comment) {
      return;
    }
    let user = JSON.parse(localStorage.getItem("user"));
    let token = JSON.parse(localStorage.getItem("token"));

    try {
      const data = await axios.put(
        `http://localhost:3000/api/post/update/?post_id=${post_id}&option=comment&id=${user._id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          method: "PUT",
          comment: Comment,
        }
      );
      dispatch({
        type: "UPDATE_COMMENT",
        payload: { id: post_id, data: data.data },
      });
      toast.success("Comment Added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setComment(null);
    } catch (error) {
      console.log(error);
    }
  };
  // handle like
  const HandleLike = async (post_id) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = JSON.parse(localStorage.getItem("token"));
    const data = await fetch(
      `http://localhost:3000/api/post/update/?post_id=${post_id}&option=like&id=${user._id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "PUT",
      }
    ).then((res) => res.json());
    dispatch({
      type: "UPDATE_LIKE",
      payload: { id: post_id, data: data },
    });
  };

  // !delete post
  const handleDeletePost = async (post_id) => {
    
    let result = await axios.put(
      "http://localhost:3000/api/post/delete",
      {
        post_id: post_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (result.status === 204) {
      dispatch({ type: "REMOVE_POST", payload: post_id });
      toast.success("Post Removed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleClose();
    }
  };

  function formatTime(timestamp) {
    const currentTime = new Date();
    const postedTime = new Date(timestamp);
    const timeDifference = currentTime - postedTime;

    // Calculate the time difference in seconds, minutes, and hours
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      // Customize the date format based on your requirements
      const options = { year: "numeric", month: "long", day: "numeric" };
      return postedTime.toLocaleDateString(undefined, options);
    }
  }

  //post fetch request------------------------

  const imageFolder = "http://localhost:3000/public/images/";
  const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-4">
        {posts.map((postValue) => {
          return (
            <div
              key={postValue._id}
              className="PostWrapper shadow-md bg-white w-[680px] rounded-lg"
            >
              <div className="post flex flex-col justify-center w-full ">
                {/* Post Heading here */}
                <div className=" py-2 px-4 flex flex-col gap-2">
                  <div className="topheading flex flex-row justify-between items-center">
                    <div className="left flex flex-row gap-2">
                      <Avatar
                        src={
                          "http://localhost:3000/public/user/images/" +
                          postValue.PostUserImg
                        }
                      />
                      <div>
                        <h1 className="text-base font-medium">
                          <Link
                            to={"profile/" + postValue.PostUserID}
                            className="hover:underline"
                          >
                            {postValue.PostUserName}
                          </Link>
                        </h1>
                        <p className="text-sm text-gray-500">
                          {/* {postValue.updatedAt} */}
                          {formatTime(postValue.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="right cursor-pointer">
                      <MoreHorizOutlinedIcon
                        variant="contained"
                        // aria-describedby={id}
                        // onClick={handleClick}
                        
                        aria-describedby={`popover-${postValue._id}`}
                        // onClick={handleClick}
                        onClick={(event) => handleClick(event, postValue.PostHeading)}
                      />


                      <Popover
                        id={`popover-${postValue._id}`}
                        open={openPopoverId === postValue.PostHeading}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <div className="w-[344px] flex flex-col p-2 gap-2">
                          <div className="flex items-center hover:bg-gray-200 transition-all rounded-md cursor-pointer gap-2 px-2 py-1">
                            <BookmarkRemoveIcon />
                            <div className="flex flex-col">
                              <h1 className="font-semibold">Unsave Post</h1>
                              <span className="text-xs text-gray-400">
                                Remove this from your saved item
                              </span>
                            </div>
                          </div>
                          <hr />
                          <div
                            onClick={() => {
                              handleDeletePost(postValue._id);
                            }}
                            className="flex items-center hover:bg-gray-200 transition-all rounded-md cursor-pointer gap-2 px-2 py-2"
                          >
                            <DeleteIcon />
                            <div className="flex flex-col">
                              <h1 className="font-semibold">Delete Post</h1>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    </div>
                  </div>
                  <div className="message">{postValue.PostHeading}</div>
                </div>
                {/* Post Image here */}
                <div className="postImage w-full grid place-items-center bg-black">
                  <img src={imageFolder + postValue.postImg} alt="post image" />
                </div>
                {/* Post Bottom here */}
                <div className="bottomSection px-3">
                  <div className="likeCommentCount flex flex-row justify-between py-2 px-4">
                    <div className="like text-gray-500 flex flex-row gap-2 text-base">
                      <ThumbUpOutlinedIcon fontSize="small" />
                      {postValue.PostLikes.length}
                    </div>
                    <div className="commentShare flex flex-row text-gray-500 gap-4">
                      <div className="flex gap-1 text-base">
                        <span>{postValue.PostComments.length}</span>
                        <p>Comments</p>
                      </div>
                      <div className="commentShare flex flex-row gap-1 text-gray-500 text-base">
                        <span>{postValue.PostShare.length}</span>
                        <p>Share</p>
                      </div>
                    </div>
                  </div>
                  <div className="likeComment flex flex-row justify-between border-t-2 p-1 py-2">
                    <LikeButton
                      key={postValue.id}
                      post={postValue}
                      loggedInUserId={loggedInUserId}
                      updateLikeState={HandleLike}
                    />
                    {/* postmodal comment  */}
                    <PostModal postData={postValue} />
                    <div className="Share flex flex-row justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md gap-2 text-gray-500 cursor-pointer transition-all">
                      <ShareOutlinedIcon />
                      Share
                    </div>
                  </div>
                </div>{" "}
                <div className="comments flex flex-col gap-2 p-2 px-4">
                  {postValue.PostComments.slice(0, 2).map((value, i) => {
                    return (
                      <div className="flex flex-row gap-2" key={i}>
                        <Avatar
                          src={
                            "http://localhost:3000/public/user/images/" +
                            value.user_pic
                          }
                        />
                        <div className="p-2 bg-gray-100 shadow-md rounded-2xl flex flex-col  max-w-[80%]">
                          <h1 className="font-medium">{value.user_name}</h1>
                          <span className="comment text-gray-600 text-sm">
                            {value.comment}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="commentSection flex flex-row pb-2 px-4 gap-2 items-center">
                  <Avatar
                    src={"http://localhost:3000/public/user/images/" + user.pic}
                  />
                  <input
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#F0F2F5] rounded-full px-4 outline-none py-2"
                    placeholder="Write a comment..."
                  />
                  {Comment ? (
                    <SendRoundedIcon
                      className="cursor-pointer"
                      color="primary"
                      onClick={(e) => HandleComment(postValue._id)}
                    />
                  ) : (
                    <SendRoundedIcon color="disabled" disabled />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfilePost;
