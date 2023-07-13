import React, { useEffect } from "react";
import { useDispatchContext, useStateContext } from "../../../state";
import axios from "axios";
import Card from "./Card";
import FriendRequestCard from "./FriendRequestCard";

const Home = ({ type }) => {
  document.title = "Friends | Facebook";

  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { user } = state.user;
  const { friendRequests } = state.friendRequests;

  const newArrayOfIds = user.friends.map((obj) => obj.user_id);

  //fetch friends or current user
  const fetchFriends = async () => {
    let result = await axios.post("http://localhost:3000/api/user/findusers", {
      data: newArrayOfIds,
    });
    if (result.status === 200) {
      const newArray = result.data.map((obj) => ({
        user_id: obj._id,
        user_name: obj.name,
        user_pic: obj.pic,
      }));

      //user_id , user_name, user_pic
      user.friends = newArray;
      dispatch({ type: "UPDATE_USER", payload: user });
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

 
  useEffect(() => {
    fetchFriends();
  }, []);



  // friend request fetch
  const fetchFriendRequest = async () => {
    dispatch({ type: "FETCH_FRIEND_REQUESTS_REQUEST" });
    try {
      let friendRequestResult = await axios.post(
        "http://localhost:3000/api/user/friendrequests",
        {
          _id: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "FETCH_FRIEND_REQUESTS_SUCCESS",
        payload: friendRequestResult.data,
      });
    } catch (error) {
      dispatch({ type: "FETCH_FRIEND_REQUESTS_FAILURE", payload: error });
    }
  };

  useEffect(() => {
    fetchFriendRequest();
  }, []);



  

  return (
    <>
      <div className="wrapper flex gap-4 flex-col">
        <h1 className="font-bold text-xl capitalize">{type}</h1>
        <div className="containerItems flex flex-row flex-wrap gap-3">
          {type == "Home" &&
            user.friends.map((value) => {
              return <Card key={value.user_id} value={value} /> ;
            })}
          {type == "Home" &&
            friendRequests.map((value, index) => {
              return <FriendRequestCard key={index} value={value} />;
            })}

          {type == "friendRequest" &&
            friendRequests.map((value, index) => {
              return <FriendRequestCard key={index} value={value} />;
            })}
          {type == "allFriends" &&
            user.friends.map((value) => {
              return <Card key={value.user_id} value={value} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
