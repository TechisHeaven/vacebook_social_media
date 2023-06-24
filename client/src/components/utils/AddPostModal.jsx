import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Avatar, Button } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import axios from "axios";
import useFetch from "../../hooks/fetchpost";
import { useDispatchContext, useStateContext } from "../../state";

const AddPostModal = ({ handleClose, open, user }) => {
  const [fieldsBlank, setFieldsBlank] = useState(true);
  const [headingName, setHeadingName] = useState('');
  const [PostImage, setPostImage] = useState({});

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    borderRadius: "10px",
    outline: "none",
    boxShadow: 24,
  };

  let token = JSON.parse(localStorage.getItem("token"));
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  // const [update, setUpdate] = useState(true);
  const dispatch = useDispatchContext();
  const state = useStateContext();

  let InputRef = useRef();

  //handle blank fields
  const inputHeadingHandle = (e) => {
    setHeadingName(e.target.value);
    if (e.target.value.length <= 0) {
      setFieldsBlank(true);
    } else {
      setFieldsBlank(false);
    }
  };

  // handle on click input area input auto focus

  const handleInput = () => {
    InputRef.current.focus();
  };

  const { fetchData } = useFetch(options);
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    let userData = localStorage.getItem("user");
    userData = JSON.parse(userData);

    // Create a FormData object
    const formData = new FormData();
    formData.append("PostUserID", userData._id);
    formData.append("PostUserName", userData.name);
    formData.append("PostUserImg", userData.pic);
    formData.append("PostHeading", headingName);
    formData.append("postImg", PostImage);

    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:3000/api/post/create", formData, config)
      .then((response) => {
        if (response.status == 201 || statusText == "Created") {
          const newPost = response.data;
          const postExists = state.posts.find((post) => post._id === newPost.id);

          if (!postExists) {
            dispatch({ type: "ADD_POST", payload: newPost });
          }
          handleClose();
        }
      })
      .catch((error) => {
        if (error.status == 401) {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col">
              <header className="border-b-2 w-full text-center py-4">
                <h1 className="font-bold text-xl">Create post</h1>
                <div
                  className="absolute top-2 right-5 p-2 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer"
                  onClick={handleClose}
                >
                  <CloseRoundedIcon />
                </div>
              </header>
              <div>
                <div className="heading flex flex-row p-4 gap-2 items-center">
                  <Avatar
                    src={"http://localhost:3000/public/user/images/" + user.pic}
                  >
                    {user.name}
                  </Avatar>
                  <p className="font-semibold">{user.name}</p>
                </div>
                <div className="w-full">
                  <input
                    className="w-full outline-none p-4"
                    type="text"
                    placeholder={"What's on your mind, " + user.name}
                    onChange={(e) => inputHeadingHandle(e)}
                  />
                </div>
              </div>
              <div className="p-4 px-6 relative">
                <div
                  className="ImagAdd cursor-pointer hover:bg-gray-200 transition-all bg-gray-100 flex flex-col items-center justify-center h-[200px] outline outline-1 outline-offset-8 outline-gray-400"
                  onClick={() => handleInput()}
                >
                  <div className="icon p-3 rounded-full bg-gray-300 w-[40px] flex items-center justify-center">
                    <AddToPhotosRoundedIcon fontSize="small" />
                  </div>
                  <h1>Add photos/videos</h1>
                  <input
                    onChange={(e) => setPostImage(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    ref={InputRef}
                    className=" w-full h-full opacity-0 absolute cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="p-4">
              <Button
                fullWidth
                variant="contained"
                style={
                  !fieldsBlank
                    ? { background: "#1B74E4" }
                    : { background: "gray", cursor: "not-allowed" }
                }
                className="rounded-lg"
                disabled={fieldsBlank ? true : false}
                type="submit"
              >
                <p className="capitalize font-semibold">Post</p>
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddPostModal;
