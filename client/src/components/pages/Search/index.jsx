import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Search/Sidebar";
import SearchItems from "./SearchItems";
import axios from 'axios';

const index = () => {
  let { id } = useParams();
  const [activeLink, setActiveLink] = useState(1);
  const [data, setData] = useState([]);
  document.title = `${id} - search results | Vacebook`;

  const fetchUsers = async()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    const params = {user};
    const users = await axios.get(`http://localhost:3000/api/user/search/${id}`,{ params })
    setData(users.data)
  }



  useEffect(()=>{
    fetchUsers();
  }, [id])
  

  return (
    <div>
      <div className="wrapper flex flex-row">
        <div className="w-[360px] min-w-[360px] h-full"></div>
        <Sidebar ActiveLinkCallback={setActiveLink} />
        <div className="p-8 w-full">{activeLink == 1 ? <SearchItems type="all" data={data}/> : null}</div>
      </div>
    </div>
  );
};

export default index;
