import React, { useState } from "react";
import MessengerHeader from "../Messenger/Header/header";
import Sidebar from "../Messenger/components/Sidebar";
import ChatArea from "./components/ChatArea";
import ChatUser from "./components/ChatUser";
const index = () => {
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [selectedColorThemeTile , setSelectedColorThemeTile]= useState("bg-blue-500");

  const handleTileSelect = (_id) => {
    setSelectedTileId(_id);
  };

  const handleColorThemeTileSelect = (name)=>{
    setSelectedColorThemeTile(name)
  }

  return (
    <div>
      <MessengerHeader />
      <div className="main flex flex-row justify-between">
        <Sidebar onTileSelect={handleTileSelect} selectedTile={selectedTileId}/>
        <ChatArea selectedTileId={selectedTileId} selectedColorThemeTile={selectedColorThemeTile}/>
        <ChatUser onColorTileSelect={handleColorThemeTileSelect} selectedColorThemeTile={selectedColorThemeTile} />
      </div>
    </div>
  );
};

export default index;
