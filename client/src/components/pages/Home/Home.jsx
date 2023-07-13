import React, { useContext } from "react";
import Post from "./Post";
import PostWithID from "./PostWithID";
import Sidebar from "../../utils/Sidebar";
import Contacts from "./Contact";
import AddPostContainer from "../../utils/AddPostContainer";
import {useParams} from 'react-router-dom'
import { useStateContext } from "../../../state";

const Home = () => {
  document.title = "Home | Facebook";
  const state = useStateContext();
  const {user} = state.user;
  //params 
  let params = useParams();
  
  

  return (
    <div className="flex justify-between items-start py-5">
      <Sidebar />
      <div className="flex flex-col gap-4 w-[680px] max-2xl:w-[580px] max-lg:px-2">
        <AddPostContainer user={user} />
        
        {params.id ? <PostWithID postid={params.id}/> : <Post />}
        
      </div>
      <Contacts />
    </div>
  );
};

export default Home;
