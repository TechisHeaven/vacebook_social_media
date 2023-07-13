import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button } from "@mui/material";
import { useDispatchContext, useStateContext } from "../../../../state";
import { toast } from "react-toastify";
import axios from 'axios'

const UserModal = ({ openUser, handleClose }) => {
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
    minWidth: "712px",
  };

  const state = useStateContext();
  const dispatch = useDispatchContext();
  const { user } = state.user;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);

  //update user

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");

    // Create a FormData object
    const formData = new FormData();
    formData.append("_id", user._id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);

    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .put("http://localhost:3000/api/user/update/profile", formData, config)
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({ type: "UPDATE_USER", payload: response.data });
          console.log(response)
          toast.success(`User Updated`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
        open={openUser}
        onClose={handleClose}
        aria-labelledby="user-modal"
        aria-describedby="user-modal-description"
      >
        <Box sx={style}>
          <div className="heading flex flex-row">
            <header className="border-b-2 w-full text-center py-4">
              <h1 className="font-bold text-xl">Edit Profile</h1>
              <div
                className="absolute top-2 right-5 p-2 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer"
                onClick={handleClose}
              >
                <CloseRoundedIcon />
              </div>
            </header>
          </div>
          <form className="p-4 gap-4 flex flex-col">
            <div className="name flex flex-col gap-1">
              <label htmlFor="name" className="pl-2">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                id="name"
                placeholder="Enter Your Name..."
                className="outline-gray-100 border-gray-50 border-2 p-2"
              />
            </div>
            <div className="name flex flex-col gap-1">
              <label htmlFor="name" className="pl-2">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                id="name"
                placeholder="Enter Your Name..."
                className="outline-gray-100 border-gray-50 border-2 p-2"
              />
            </div>
            <div className="gender flex flex-col gap-1 items-start">
              <label htmlFor="name" className="pl-2">
                Gender
              </label>
              <div className="Gender">
                <div className="radiobtn flex w-full justify-between gap-2">
                  <span className="gap-2 cursor-pointer p-2 w-full bg-white border-[1px] border-gray-400/40  min-h-[36px] max-w-[126px] outline-none rounded-[5px] flex justify-between">
                    <label htmlFor="male" className="w-full">
                      Male
                    </label>
                    <input
                      onChange={() => setGender("male")}
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={gender === "male"}
                    />
                  </span>
                  <span className="gap-2 cursor-pointer p-2 w-full bg-white border-[1px] border-gray-400/40  min-h-[36px] max-w-[126px] outline-none rounded-[5px] flex justify-between">
                    <label htmlFor="female" className="w-full">
                      Female
                    </label>
                    <input
                      onChange={() => setGender("female")}
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={gender === "female"}
                    />
                  </span>
                  <span className="gap-2 cursor-pointer p-2 w-full bg-white border-[1px] border-gray-400/40  min-h-[36px] max-w-[126px] outline-none rounded-[5px] flex justify-between">
                    <label htmlFor="other" className="w-full">
                      Other
                    </label>
                    <input
                      onChange={() => setGender("other")}
                      type="radio"
                      name="gender"
                      id="other"
                      value="other"
                      checked={gender === "other"}
                    />
                  </span>
                </div>
              </div>
            </div>
            <Button onClick={(e)=>handleSubmit(e)} variant="contained" style={{ background: "#1B74E4" }}>
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UserModal;
