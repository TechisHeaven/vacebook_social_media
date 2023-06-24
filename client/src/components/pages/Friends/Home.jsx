import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatchContext, useStateContext } from "../../../state";
import axios from 'axios'

const Home = ({ type }) => {
  document.title = "Friends | Facebook";

  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { user } = state.user;

  const newArrayOfIds = user.friends.map(obj => obj.user_id);



  useEffect(()=>{
    const fetchFriends = async()=>{
      let result = await axios.post("http://localhost:3000/api/user/findusers", {
        data: newArrayOfIds,
      })
     if(result.status===200){

      const newArray = result.data.map(obj => ({
        user_id: obj._id,
        user_name: obj.name,
        user_pic: obj.pic,
      }));
      
      //user_id , user_name, user_pic
      user.friends = newArray;
      dispatch({type: 'UPDATE_USER', payload: user})
      localStorage.setItem('user', JSON.stringify(user));
     }
    }
    fetchFriends()
  },[])


  let Type = type;
  let foldername = "http://localhost:3000/public/user/images/";
  return (
    <>
      <div className="wrapper flex gap-4 flex-col">
        <h1 className="font-bold text-xl">Home</h1>
        <div className="containerItems flex flex-row flex-wrap gap-3">
          {user.friends.map((value) => {
            return (
              <div
                key={value.user_id}
                className="item max-w-[250px] w-full min-w-[200px] bg-white rounded-lg overflow-hidden shadow-md"
              >
                {Type == "allFriends" ? (
                  <Link to={"/profile?id=" + value.user_id}>
                    <img
                      src={foldername + value.user_pic}
                      alt="image"
                      className="w-full aspect-square"
                    />
                    <div className="flex flex-col p-3 gap-2">
                      <h1 className="font-semibold">{value.user_name}</h1>

                      <Button
                        variant="contained"
                        style={{ background: "#1B74E4" }}
                      >
                        <p className="text-sm capitalize font-medium">
                          Confirm
                        </p>
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          background: "rgba(128,128,128,.3)",
                          color: "black",
                        }}
                      >
                        <p className="text-sm capitalize font-medium">Delete</p>
                      </Button>
                    </div>
                  </Link>
                ) : (
                  <Link to={"/profile?id=" + value.user_id}>
                    <img
                      src={foldername + value.user_pic}
                      alt="image"
                      className="w-full aspect-square"
                    />
                    <div className="flex flex-col p-3 gap-2">
                      <h1 className="font-semibold">{value.user_name}</h1>

                      <Button
                        variant="contained"
                        style={{ background: "#1B74E4" }}
                      >
                        <p className="text-sm capitalize font-medium">
                          Message
                        </p>
                      </Button>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
