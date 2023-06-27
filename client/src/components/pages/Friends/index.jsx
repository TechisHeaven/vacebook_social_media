import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";

const index = () => {
  const [activeLink, setActiveLink] = useState(1);

  return (
    <>
      <div className="wrapper flex flex-row ">
        <div className="w-[360px] min-w-[360px]"></div>
        <Sidebar ActiveLinkCallback={setActiveLink} />
        <div className="p-8">
        {activeLink == 1 ? <Home type="Home"/> : null}
        {activeLink == 2 ? <Home type="friendRequest"/> : null}
        {activeLink == 3 ? <Home type="allFriends"/> : null}
        </div>
      </div>
    </>
  );
};

export default index;
