import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Popover } from "@mui/material";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useDispatchContext, useStateContext } from "../../../../state";
import axios from 'axios';
import {toast} from 'react-toastify';



const FriendSec = () => {
  // let state = 
  const dispatch = useDispatchContext();
  const state = useStateContext();
  const {user}= state.user;

  let data = user.friends;

  const [friendData, setFriendData] = useState(data);
// handle search friend
  const handleSearch = (e) => {
    let search = e.target.value;

    if (search.length > 0) {
      // Data filter here
      let result = data
        .filter((value) => {
          return value.Name.toLowerCase()
            .replaceAll("\\s", "")
            .includes(search.toLowerCase());
        })
        .map((value) => {
          return value;
        });
      setFriendData(result);
    } else {
      setFriendData(data);
    }
  };


  //handleFriend
  const handleFriend = async(user_id)=>{
    
    let result = await axios.put('http://localhost:3000/api/user/removefriend', {
      mainUser: {
        _id: user._id
      },
      user: {
        user_id: user_id
      }
    })

    if(result.status === 200){
      toast.success(`Friend Removed`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: "UPDATE_USER", payload: result.data });
      setFriendData(result.data.friends)
      handleClose()
    }
  }

  // PopOver function

  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenPopoverId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopoverId(null)
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="wrapper  bg-white w-full rounded-lg min-w-[1218px] p-4 shadow-md">
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-xl">Friends</h1>
            <div className="bg-gray-100 p-2 pl-3 rounded-full shadow-sm">
              <SearchIcon className="text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="bg-gray-100 outline-none pl-2"
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </div>
          <div className="items w-full flex flex-wrap p-2 gap-5">
            {friendData.length > 0 && friendData.map((item) => {
              return (
                <div
                  className="item min-w-[573px] flex items-center justify-between pr-4 gap-2"
                  key={item.user_id}
                >
                  <div className="flex gap-2 items-center w-full">
                    <div className="w-[80px] aspect-square object-cover rounded-lg overflow-hidden">
                      <img src={'http://localhost:3000/public/user/images/'+item.user_pic} alt="friend img" />
                    </div>
                    <div className="heading">
                      <h1 className="text-lg font-semibold">{item.user_name}</h1>
                      <span className="text-gray-500">25 mutual friends</span>
                    </div>
                  </div>
                  <div>
                    <MoreHorizIcon
                      variant="contained"
                      aria-describedby={`popover-${item.user_id}`}
                      onClick={(event) => handleClick(event, item.user_name)}
                    />

                    <Popover
                      id={`popover-${item.user_id}`}
                      open={openPopoverId === item.user_name}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <div className="min-w-[320px] p-2">
                        <div onClick={()=>handleFriend(item.user_id)} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-all cursor-pointer">
                          <PersonRemoveOutlinedIcon />
                          <p className="font-bold">Unfriend</p>
                        </div>
                      </div>
                    </Popover>
                  </div>
                </div>
              );
            })}
            {
              friendData.length <= 0 && <div>
                <h1>No Friends Exists</h1>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendSec;
