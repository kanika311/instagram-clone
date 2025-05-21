"use client";

import { useEffect, useRef, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { BsCameraVideo, BsInfoCircle } from "react-icons/bs";
import { HiOutlineMicrophone } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineInsertPhoto, MdOutlineEmojiEmotions } from "react-icons/md";
import { io } from "socket.io-client";
import { useSocket } from "@/Content/socketContext";
import { useSelector,useDispatch } from "react-redux";
import messageApi from "@/mocks/message";
import { chatSingleUser } from "@/redux/slices/message";
import Image from 'next/image';



export default function ChatBox({chatUser}) {

console.log(chatUser,"chatUserascd")
const dispatch=useDispatch();
const chatmessage=useSelector((state)=>state.message)
  const [message, setMessage] = useState("");
  const { sendMessage } = useSocket();
  const user = useSelector((state) => state.auth.user);
 const id=user.id
  const receiverId = chatUser?.user?._id || chatUser?._id;

  const handleSend = async () => {
    if (!receiverId) {
      console.error("No receiverId");
      return;
    }
    await sendMessage({
      senderId: id,
      receiverId,
      message,
      isGroup: false
    });
    setMessage("");
    // Refresh messages immediately after sending
    await handleMessages(chatUser?.chatId);
  };

  // Add auto-scroll to bottom when new messages arrive
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatmessage?.chat?.data]);

  // chat single user
const handleMessages = async (chatId) => {
  if (!chatId) {
    console.error("No chatId provided");
    return;
  }
  await dispatch(chatSingleUser(chatId));
};
useEffect(()=>{
  handleMessages(chatUser?.chatId);
},[chatUser])
console.log(chatmessage,"result of chat")


 

  return (
    <div className="flex flex-col h-screen w-full bg-white shadow-md z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Image
            src={chatUser?.user?.picture || "/photos/avatar.jpg"}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{chatUser?.user?.username}</p>
            <p className="text-sm text-gray-500">2 active today</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xl text-gray-600">
          <FiPhoneCall className="cursor-pointer" />
          <BsCameraVideo className="cursor-pointer" />
          <BsInfoCircle className="cursor-pointer" />
        </div>
      </div>

         {/* Chat messages */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4">
  {[...(chatmessage?.chat?.data || [])]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Oldest to newest
    .map((msg) => {
      const isSender = msg?.userId?._id === chatUser?.user?._id;
      // Sender (current user)
      const senderProfilePic = user?.picture || "/photos/avatar.jpg";
      // Receiver (chatUser)
      const receiverProfilePic = chatUser?.user?.picture || chatUser?.picture || "/photos/avatar.jpg";
      const receiverName = chatUser?.user?.username || chatUser?.username || "";

      return (
        <div
          key={msg.id}
          className={`flex ${isSender ? 'justify-start' : 'justify-end'} items-start`}
        >
           {/* Sender's message: show profile on right, no name */}
           {isSender && (
            <div className="flex items-end">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-blue-500 text-white rounded-br-none">
                <div className="text-sm">{msg.message}</div>
                <div className="text-xs mt-1 opacity-70">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
              <Image
                src={receiverProfilePic}
                alt="sender"
                width={20}
                height={20}
                className="w-8 h-8 rounded-full ml-2"
              />
            </div>
          )}
          {/* Receiver's message: show profile and name on left */}
          {!isSender && (
            <div className="flex items-end">
              <Image
                src={senderProfilePic}
                alt='you'
                width={20}
                height={20}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                
                <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="text-sm">{msg.message}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          )}

         
        </div>
      );
    })}
  <div ref={messagesEndRef} />
</div>

      {/* Message Input */}
      <div className="p-4 border-t flex items-center gap-3">
        <input
          type="text"
          placeholder="Message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <HiOutlineMicrophone className="text-2xl text-gray-600 cursor-pointer" />
        <MdOutlineInsertPhoto className="text-2xl text-gray-600 cursor-pointer" />
       <button onClick={() => handleSend(receiverId)} className="text-blue-700 font-500 text-xl">send</button>
      </div>
    </div>
  );
}
