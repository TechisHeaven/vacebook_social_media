import { Avatar, Popover, Skeleton } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PostModal from "../../utils/PostModal";
import { Link } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ImageComponent from "../../utils/ImageComponent";
import LikeButton from "./button";
import { useDispatchContext, useStateContext } from "../../../state";
import axios from "axios";

const Post = () => {
  const [Comment, setComment] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [page, setPage] = useState(0);
  const imageFolder = "http://localhost:3000/public/images/";
  const state = useStateContext();
  const dispatch = useDispatchContext();

  // const { posts } = state;
  let {posts} = state.posts;
  let {user} = state.user;
  // const { posts, user } = state;


  let inputRef = useRef();

  useEffect(() => {
    dispatch({ type: "RESET_POSTS" });
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

  let token = JSON.parse(localStorage.getItem("token"));
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  //fetch post
  //post fetch request------------------------

  const fetchData = async () => {
    try {
      dispatch({ type: "FETCH_POSTS_REQUEST" });
      // post fetch
      const data = await fetch(
        `http://localhost:3000/api/post?page=${page}`,
        options
      ).then((res) => res.json());

      for (let i = 0; i < data.length; i++) {
        // postedUserData fetch here
        let PostedUserId = await data[i].PostUserID;

        const PostedUserData = await fetch(
          `http://localhost:3000/api/user/${PostedUserId}`,
          options
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
      setComment(null);
      inputRef.current.value = '';
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // like btn and function
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

  if (!localStorage.getItem("token")) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
    return;
  }

  const shareLink = async (id) => {
    if (navigator.share) {
      try {
        let webUrl = `http://localhost:5173/${id}`;
        await navigator.share({
          title: "Example Page",
          url: webUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      console.log("Web Share not supported on this browser");
    }
  };

  const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-4">
        {postLoading ? (
          <div className="text-white bg-white w-full flex flex-col p-4 gap-2">
            <div className="flex flex-row gap-2">
              <Skeleton
                animation="wave"
                variant="circular"
                height={50}
                width={50}
              />
              <div className="gap-2 flex flex-col">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={20}
                  width={200}
                />
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={20}
                  width={70}
                />
              </div>
            </div>
            <Skeleton animation="wave" variant="rectangular" height={500} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={100}
              className="mt-4"
            />
          </div>
        ) : (
          <>
            {posts.map((postValue, index) => {
              return (
                <div
                  key={postValue._id}
                  className="PostWrapper shadow-md bg-white w-[680px] max-2xl:w-full rounded-lg"
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
                                className="hover:underline cursor-pointer"
                              >
                                {postValue.PostUserName}
                              </Link>
                            </h1>
                            <p className="text-sm text-gray-500">
                              {postValue.updatedAt}
                            </p>
                          </div>
                        </div>
                        <div className="right cursor-pointer">
                          <MoreHorizOutlinedIcon
                            aria-describedby={id}
                            onClick={handleClick}
                          />
                          <Popover
                            id={id}
                            open={open}
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
                            <div className="w-[340px] p-2 flex flex-row items-center justify-start">
                              <div
                                className="wrapper flex items-center flex-row gap-2 hover:bg-gray-100 cursor-pointer transition-all w-full"
                                onClick={() => {
                                  console.log("saved to bookmark");
                                }}
                              >
                                <BookmarkBorderIcon fontSize="medium" />
                                <div>
                                  <h1 className="text-lg">Save Post</h1>
                                  <p className="text-xs text-gray-400">
                                    Add this to your saved items
                                  </p>
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
                      {/* <img src={imageFolder+ postValue.postImg} alt="post image" /> */}
                      <ImageComponent src={imageFolder + postValue.postImg} />
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
                      <div className="likeComment flex flex-row justify-between border-t-2 p-1 py-2 border-b-2">
                        <LikeButton
                          key={postValue.id}
                          post={postValue}
                          loggedInUserId={loggedInUserId}
                          updateLikeState={HandleLike}
                        />

                        <PostModal postData={postValue} />
                        <div
                          onClick={() => shareLink(postValue._id)}
                          className="Share flex flex-row justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md gap-2 text-gray-500 cursor-pointer transition-all"
                        >
                          <ShareOutlinedIcon />
                          Share
                        </div>
                      </div>
                    </div>
                    <div className="comments flex flex-col gap-2 p-2 px-4">
                      {postValue.PostComments.slice(0, 2).map(
                        (value, i) => {
                          return (
                              <div className="flex flex-row gap-2" key={i}>
                                <Avatar
                                  src={
                                    "http://localhost:3000/public/user/images/" +
                                    value.user_pic
                                  }
                                />
                                <div className="p-2 bg-gray-100 shadow-md rounded-2xl flex flex-col  max-w-[80%]">
                                  <h1 className="font-medium">
                                    {value.user_name}
                                  </h1>
                                  <span className="comment text-gray-600 text-sm">
                                    {value.comment}
                                  </span>
                                </div>
                              </div>
                          );
                        }
                      )}
                    </div>
                    <div className="commentSection flex flex-row py-2 px-4 gap-2 items-center">
                      <Avatar
                        src={
                          "http://localhost:3000/public/user/images/" + user.pic
                        }
                      />
                      <input
                        type="text"
                        onChange={(e) => setComment(e.target.value)}
                        ref={inputRef}
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
          </>
        )}
      </div>
    </>
  );
};

export default Post;
