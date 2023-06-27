import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatchContext, useStateContext } from "../../../state";
import { toast } from "react-toastify";

const FriendRequestCard = ({ value }) => {
  let foldername =
    import.meta.env.VITE_PUBLIC_USER_IMAGE_FOLDER ||
    "http://localhost:3000/public/user/images/";

  const dispatch = useDispatchContext();
  const state = useStateContext();
  const { user } = state.user;

  const removeFriend = async (id) => {
    try {
      let result = await axios.put(
        "http://localhost:3000/api/user/removefriend",
        {
          mainUser: {
            _id: user._id,
          },
          user: {
            user_id: id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        dispatch({ type: "UPDATE_USER", payload: result.data });
        toast.warn("Friend Removed Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {}
  };

  return (
    <div className="item max-w-[250px] w-full min-w-[200px] bg-white rounded-lg overflow-hidden shadow-md">
      <div to={"/profile?id=" + value.user_id}>
        <img
          src={foldername + value.user_pic}
          alt="image"
          className="w-full aspect-square"
        />
        <div className="flex flex-col p-3 gap-2">
          <h1 className="font-semibold">{value.user_name}</h1>

          <Button variant="contained" style={{ background: "#1B74E4" }}>
            <p className="text-sm capitalize font-medium">Message</p>
          </Button>
          <Button
            onClick={() => removeFriend(value.user_id)}
            variant="contained"
            style={{
              background: "rgba(128,128,128,.3)",
              color: "black",
            }}
          >
            <p className="text-sm capitalize font-medium">Remove</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
