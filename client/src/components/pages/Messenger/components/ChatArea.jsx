import React, { useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Button } from "@mui/material";
import {Link} from 'react-router-dom'

const ChatArea = ({ selectedTileId ,selectedColorThemeTile}) => {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat messages container
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [selectedTileId]);

  let chats = [
    {
      _id: 1,
      received: true,
      chatMessage: "hello bro!",
    },
    {
      _id: 2,
      received: false,
      chatMessage: "hello bro!",
    },
    {
      _id: 3,
      received: true,
      chatMessage: "hello bro!",
    },
    {
      _id: 4,
      received: true,
      chatMessage: "hello bro!",
    },
    {
      _id: 5,
      received: false,
      chatMessage: "hello bro!",
    },
    {
      _id: 6,
      received: false,
      chatMessage: "hello bro!",
    },
    {
      _id: 7,
      received: true,
      chatMessage: "hello bro!",
    },
    {
      _id: 8,
      received: true,
      chatMessage: "hello bro!",
    },
    {
      _id: 9,
      received: true,
      chatMessage: "hello bro!",
    },
    {
      _id: 10,
      received: false,
      chatMessage: "hello bro! test10 test lorem text here",
    },
    {
      _id: 11,
      received: false,
      chatMessage: "hello bro! test10 test lorem text here",
    },
    {
      _id: 12,
      received: false,
      chatMessage: "hello bro! test10 test lorem text here",
    },
    {
      _id: 13,
      received: false,
      chatMessage: "hello bro! test10 test lorem text here",
    },
  ];


  return (
    <div className="bg-gray-100 w-full">
      {!selectedTileId ? (
        <div className="ChatNotExists grid place-items-center h-full font-semibold text-3xl text-gray-400">
          <div className="flex flex-col items-center">
            <h1>No Conversation</h1>
            <p className="text-sm capitalize">
              select chat to start conversation
            </p>
          </div>
        </div>
      ) : (
        <div className="ChatArea">
          <div className="header bg-white flex flex-col items-center sticky top-14 w-full">
            <h1 className="capitalize font-semibold text-xl">Himanshu verma</h1>
            <p className="text-sm">Active on Vacebook</p>
          </div>
          <div className="flex-grow flex flex-col ">
            <div className="chatMessages">
              <div
                className="chats h-[calc(100vh-140px)] scroll-smooth overflow-scroll flex flex-col gap-4"
                ref={chatMessagesRef}
              >
                 {
                  chats && <div className="UserInfo flex items-center flex-col p-5 gap-1">
                   <Avatar src="profilePic.jpg" sx={{width: "70px", height: "70px"}}/>
                   <h1 className="font-semibold text-xl">Himanshu verma</h1>
                   <span className="text-gray-400 capitalize text-sm">start conversation now</span>
                   <button className="px-4 py-2 hover:bg-gray-300 transition-all hover:text-black border border-gray-400 rounded-md" ><Link to="/">View Profile</Link></button>
                  </div>
                }

                {chats && chats.map((chat) => {
                  return chat.received ? (
                    <div key={chat._id} className="Recievedchat py-3 flex items-center gap-2 pl-2 ">
                      <Avatar src="./profilePic.jpg" sx={{ width: "35px", height: "35px" }} />
                      <p className={`${selectedColorThemeTile} text-white inline-block p-2 rounded-3xl rounded-bl-none shadow-md`}>
                        Incoming Message
                      </p>
                    </div>
                  ) : (
                    <div key={chat._id} className="SenderChat py-5 flex items-end place-content-end text-end gap-2 pr-2">
                      <p className="bg-white inline-block p-2 rounded-3xl rounded-br-none shadow-md">
                        Outgoing Message
                      </p>
                      <Avatar src="./profilePic.jpg" sx={{ width: "15px", height: "15px" }} />
                    </div>
                  );
                })}
               
              </div>
            </div>
            <div className="chatBox relative bg-transparent">
              <div className="w-[calc(100%-20px)] flex flex-row absolute left-2 -bottom-8 bg-white">
                <input
                  type="text"
                  className="py-4 px-2 w-full border-r outline-none"
                  placeholder="Type a message..."
                />
                {/* <Button className="text-blue-400 px-4 border-l" sx={{background: "#60A5FA"}}> */}
                <Button color="primary">
                  <SendIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
