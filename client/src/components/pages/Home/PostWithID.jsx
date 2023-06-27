import React, { useEffect, useState } from "react";
import PostModal from "../../utils/PostModal";
import LikeButton from "./button";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ImageComponent from "../../utils/ImageComponent";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const PostWithID = ({ postid }) => {
  //   console.log(postid);
  const location = useNavigate();

  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      if (postid.length < 24) {
        location("/");
        return;
      }
      let token = JSON.parse(localStorage.getItem("token"));
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const data = await fetch(
        `http://localhost:3000/api/post/${postid}`,
        options
      ).then((res) => res.json());
      setPost(data);
    };

    fetchPost();
  }, []);
  const imageFolder = "http://localhost:3000/public/images/";
  let user = JSON.parse(localStorage.getItem("user"));

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

  //timeformat
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

  return (
    <>
      <div
        key={post._id}
        className="PostWrapper shadow-md bg-white w-[680px] max-2xl:w-full rounded-lg"
      >
        <div className="post flex flex-col justify-center w-full ">
          {/* Post Heading here */}
          <div className=" py-2 px-4 flex flex-col gap-2">
            <div className="topheading flex flex-row justify-between items-center">
              <div className="left flex flex-row gap-2">
                <Avatar
                  src={
                    import.meta.env.VITE_PUBLIC_USER_IMAGE_FOLDER +
                    post.PostUserImg
                  }
                />
                <div>
                  <h1 className="text-base font-medium">
                    <Link
                      to={"/profile/" + post.PostUserID}
                      className="hover:underline"
                    >
                      {post.PostUserName}
                    </Link>
                  </h1>
                  <p className="text-sm text-gray-500">
                    {/* {post.updatedAt} */}
                    {formatTime(post.updatedAt)}
                    
                  </p>
                </div>
              </div>
            </div>
            <div className="message">{post.PostHeading}</div>
          </div>
          {/* Post Image here */}
          <div className="postImage w-full grid place-items-center bg-black">
            {/* <img src={imageFolder+ postValue.postImg} alt="post image" /> */}
            <ImageComponent src={imageFolder + post.postImg} />
          </div>

          {/* Post Bottom here */}
          <div className="bottomSection px-3">
            <div className="likeCommentCount flex flex-row justify-between py-2 px-4">
              <div className="like text-gray-500 flex flex-row gap-2 text-base">
                <ThumbUpOutlinedIcon fontSize="small" />
                {post.PostLikes?.length}
              </div>
              <div className="commentShare flex flex-row text-gray-500 gap-4">
                <div className="flex gap-1 text-base">
                  <span>{post.PostComments?.length}</span>
                  <p>Comments</p>
                </div>
                <div className="commentShare flex flex-row gap-1 text-gray-500 text-base">
                  <span>{post.PostShare?.length}</span>
                  <p>Share</p>
                </div>
              </div>
            </div>
            <div className="likeComment flex flex-row justify-between border-t-2 p-1 py-2">
              {/* <LikeButton
                key={post.id}
                post={post}
                loggedInUserId={loggedInUserId}
                updateLikeState={HandleLike}
              /> */}

              {/* <PostModal postData={post} /> */}
              <div
                onClick={() => shareLink(post._id)}
                className="Share flex flex-row justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md gap-2 text-gray-500 cursor-pointer transition-all"
              >
                <ShareOutlinedIcon />
                Share
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostWithID;
