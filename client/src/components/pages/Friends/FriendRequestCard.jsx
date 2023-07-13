import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatchContext, useStateContext } from "../../../state";

const FriendRequestCard = ({ value }) => {
  let foldername = "http://localhost:3000/public/user/images/";

  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { user } = state.user;


  const HandleFriendRequest = async (value,RequestStatus) => {
    try {
      let result = await axios.put(
        "http://localhost:3000/api/user/friendrequests",
        {
          user: {
            _id: value._id,
            name: value.name,
            pic: value.pic,
          },
          mainUser: {
            _id: user._id,
            name: user.name,
            pic: user.pic,
          },
          status: RequestStatus
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
  
      dispatch({ type: "UPDATE_USER", payload: result.data });
      dispatch({ type: "FETCH_FRIEND_REQUESTS_RESET", payload: result.data });
    } catch (error) {
      dispatch({ type: "FETCH_FRIEND_REQUESTS_RESET" });
    }
   
  };



  

  return (
    <div>
      <div className="item max-w-[250px] w-full min-w-[200px] bg-white rounded-lg overflow-hidden shadow-md">
        {/* <Link to={"/profile?id=" + value._id}> */}
        <div>
          <img
            src={foldername + value.pic}
            alt="image"
            className="w-full aspect-square"
          />
          <div className="flex flex-col p-3 gap-2">
            <h1 className="font-semibold">{value.name}</h1>

            <Button
              onClick={() =>
                HandleFriendRequest(value,"accepted")
              }
              variant="contained"
              style={{ background: "#1B74E4" }}
            >
              <p className="text-sm capitalize font-medium">Confirm</p>
            </Button>
            <Button
              onClick={() =>
                HandleFriendRequest(value,"rejected")
              }
              variant="contained"
              style={{
                background: "rgba(128,128,128,.3)",
                color: "black",
              }}
            >
              <p className="text-sm capitalize font-medium">Delete</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
