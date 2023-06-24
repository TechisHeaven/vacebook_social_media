import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const LikeButton = ({ post, loggedInUserId, updateLikeState }) => {
  //  console.log(post)

  const isLiked = post.PostLikes.some(
    (like) => like.user_Id === loggedInUserId
  );

  // console.log(isLiked)
  return (
    <button
    className="Like flex flex-row justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md gap-2 text-gray-500 cursor-pointer transition-all"
      onClick={() => updateLikeState(post._id)}
    >
      {isLiked ? (
        <div>
          <ThumbUpIcon color="primary" />
        </div>
      ) : (
        <ThumbUpOutlinedIcon />
      )}
    </button>
  );
};

export default LikeButton;
