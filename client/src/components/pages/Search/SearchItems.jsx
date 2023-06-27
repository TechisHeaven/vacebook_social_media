import { Avatar, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useDispatchContext, useStateContext } from "../../../state";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SearchItems = ({ type, data }) => {
  let state = useStateContext();
  let dispatch = useDispatchContext();
  let location = useNavigate();

  const HandleAddFriend = async (data) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      let result = await axios.put(
        `http://localhost:3000/api/user/addfriend`,
        {
          user: {
            _id: data._id,
          },
          mainUser: {
            _id: user._id,
          },
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch({ type: "UPDATE_USER", payload: result.data });
      toast.success("Friend Request Send", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      location('/friends')
    }
  
  };

  // const user = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="wrappper flex w-full justify-center">
        <div className="items flex flex-col gap-4">
          {data.length <= 0 && "No user found"}
          {data.map((value) => {
            return (
              <div
                className="item flex w-[680px] bg-white p-4 rounded-lg shadow-md items-center gap-3"
                key={value._id}
              >
                <Avatar
                  src={"http://localhost:3000/public/user/images/" + value.pic}
                  style={{
                    width: "65px",
                    aspectRatio: "1/1",
                    height: "65px",
                    objectFit: "cover",
                  }}
                >
                  {value.name}
                </Avatar>
                <div>
                  <h1 className="font-semibold text-lg w-full">{value.name}</h1>
                  <p className="w-full min-w-[440px]">
                    Friend · Works at Student · Dwarka Sec-16a Govt Co-ed
                    Secondary School
                    {value.bio}
                  </p>
                </div>
                {type == "all" &&
                  (!user.friends.some(
                    (friend) => friend.user_id === value._id
                  ) ? (
                    <Button
                      onClick={() => HandleAddFriend(value)}
                      variant="contained"
                      style={{
                        background: "#e7f3ff",
                        color: "#1877F2",
                        width: "100%",
                      }}
                    >
                      <div className="capitalize w-full font-semibold">
                        Add Friend
                      </div>
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      style={{
                        background: "#e7f3ff",
                        color: "#1877F2",
                        width: "100%",
                      }}
                    >
                      <div className="capitalize w-full font-semibold">
                        <Link to={"/message"}>Message</Link>
                      </div>
                    </Button>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchItems;
