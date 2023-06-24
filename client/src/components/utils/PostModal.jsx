import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Avatar, Link, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useStateContext } from "../../state";

const PostModal = ({postData}) => {
  // let postValue = PostData[0];

  const state = useStateContext();
  let postValue = postData;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //postSaved popover

  const [Comment, setComment] = useState();
  const [popoveranchorEl, popoversetAnchorEl] = React.useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 680,
    bgcolor: "background.paper",
    outline: "none",
    maxHeight: "95%",
    boxShadow: 24,
    overflowY: "scroll",
    overflowX: "hidden",
  };

  const popoverhandleClick = (event) => {
    popoversetAnchorEl(event.currentTarget);
  };

  const popoverhandleClose = () => {
    popoversetAnchorEl(null);
  };

  const popoveropen = Boolean(popoveranchorEl);
  const id = popoveropen ? "simple-popover" : undefined;
  
  let {user} = state.user;

  return (
    <>
      <div
        onClick={handleOpen}
        className="Comment flex flex-row justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md gap-2 text-gray-500 cursor-pointer transition-all"
      >
        <ChatBubbleOutlineOutlinedIcon />
        Comment
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="sticky top-0 shadow-md z-10 bg-white">
            <h1 className="font-bold text-2xl text-center p-4">{postValue.PostUserName}</h1>
            <div
              className="p-2 rounded-full bg-gray-200 absolute top-3 right-3 cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
          </div>
          <div
            key={postValue._id}
            className="PostWrapper shadow-md bg-white w-[680px] rounded-lg"
          >
            <div className="post flex flex-col justify-center w-full  relative">
              {/* Post Heading here */}
              <div className=" py-2 px-4 flex flex-col gap-2">
                <div className="topheading flex flex-row justify-between items-center">
                  <div className="left flex flex-row gap-2">
                    <Avatar src={'http://localhost:3000/public/user/images/'+ postValue.PostUserImg}/>
                    <div>
                      <h1 className="text-base font-medium">
                        <Link
                          to={"/profile/" + postValue.PostUserID}
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
                      variant="contained"
                      onClick={popoverhandleClick}
                    />
                    <Popover
                      id={id}
                      open={popoveropen}
                      anchorEl={popoveranchorEl}
                      onClose={popoverhandleClose}
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
                        <div className="flex items-center hover:bg-gray-200 transition-all rounded-md cursor-pointer gap-2 px-2 py-2">
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
                <img src={'http://localhost:3000/public/images/'+postValue.postImg} alt="post image" />
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
              </div>
              <div className="commentSection flex flex-row pb-2 px-4 gap-2 items-center bg-white w-full p-2">
                <Avatar src={'http://localhost:3000/public/user/images/'+ user.pic} />
                <input
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-[#F0F2F5] rounded-full px-4 outline-none py-2"
                  placeholder="Write a comment..."
                />
                {Comment ? (
                  <SendRoundedIcon className="cursor-pointer" color="primary" />
                ) : (
                  <SendRoundedIcon color="disabled" disabled />
                )}
              </div>

              <div className="comments flex flex-col gap-4 p-2 pl-4">
                {
                  postValue.PostComments.map((value, index)=>{
                    return <div className="flex flex-row gap-2" key={index}>
                  <Avatar src={'http://localhost:3000/public/user/images/'+ value.user_pic} />
                  <div className="p-2 bg-gray-100 shadow-md rounded-2xl flex flex-col  max-w-[80%]">
                    <h1 className="font-medium">{value.user_name}</h1>
                    <span className="comment text-gray-600 text-sm">
                      {value.comment}
                    </span>
                  </div>
                </div>
              
                  })
                }
                
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default PostModal;
