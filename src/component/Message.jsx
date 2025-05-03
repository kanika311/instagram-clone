"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RiChatSearchLine } from "react-icons/ri";
import NewMessageSearch from './Searchpopup';
import { LuMessageCircle } from "react-icons/lu";
import ChatBox from './Chatbox';
import SwitchAccountModal from './Accountswitch';
import { useDispatch, useSelector } from 'react-redux';
import { followingList } from '@/redux/slices/follow';
import { chatSingleUser, messageList } from '@/redux/slices/message';
import { IoArrowBackOutline } from "react-icons/io5";


export default function Messages({user}) {

  const message = useSelector((state) => state.message || []);
  console.log(message,"message user")
  const handleMessageList = async () => {
    try {
      const result = await dispatch(messageList());
      if (result?.data) {
        return result.data;
      }
      return false;
    } catch (error) {
      console.error("Error in handleMessageList:", error);
    }
  };

  useEffect(() => {
    handleMessageList();
  }, [message?.chat?.data]);

  const dispatch =useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);
  // search chatting
const[isChat ,setisChat]=useState(false);
const handleSearchChat=()=>{
  setisChat(!isChat);
}
// switch account 
const[isSwitchAccount,setIsSwitchAccount]=useState(false);
const handleSwitchAccount=()=>{
  setIsSwitchAccount(!isSwitchAccount);
}
const handlefollowingList=async()=>{
  try {
    const result=await dispatch(followingList())
    if(result){
     
      return result.data;
    }
    return false
    
  } catch (error) {
    console.log(error)
    
  }
}
useEffect(()=>{
  handlefollowingList();
},[])

// Add this new state for the chat from search
const [searchChatUser, setSearchChatUser] = useState(null);

// Add this function to handle starting a new chat from search
const handleStartChat = async (user) => {
  try {
    // Check if chat already exists with this user
    const existingChat = message?.message?.data?.find(chat => 
      chat?.user?._id === user._id || chat?.user?.id === user.id
    );

    if (existingChat) {
      // If chat exists, select that chat
      setSelectedChat(existingChat);
      setisChat(false);
    } else {
      // If no chat exists, start new chat
      setSearchChatUser(user);
      setSelectedChat(user);
      setisChat(false);
      
    }
  } catch (error) {
    console.error("Error in handleStartChat:", error);
  }
};



  
 

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Sidebar - Hidden on mobile when chat is selected */}
      <div className={`w-full md:w-[40%] lg:w-[35%] bg-white shadow-md p-4 md:p-6 lg:p-10 overflow-y-auto h-screen ${selectedChat ? 'hidden md:block' : 'block'}`}>
        <div className='flex items-center justify-between my-[10px] md:my-[20px] ml-10'>
          <span onClick={handleSwitchAccount} className='font-bold text-base md:text-lg text-black'> {user?.username}</span>
          <div><RiChatSearchLine size={25} onClick={handleSearchChat}/></div>
        </div>
        {isChat &&(
          <div className="fixed md:relative inset-0 z-50 md:z-0">
            <NewMessageSearch onClose={() => setisChat(false)} onStartChat={handleStartChat} />
          </div>
        )}
        {isSwitchAccount &&(
          <div className="fixed md:relative inset-0 z-50 md:z-0">
            <SwitchAccountModal onClose={() => setIsSwitchAccount(false)} user={user}/>
          </div>
        )}
        <h2 className="text-base md:text-lg font-semibold mb-4 ml-10">Messages</h2>
        <div className="space-y-2 md:space-y-3 ml-10">
          {message?.message?.data?.map(chat => (
            <div
              key={chat._id}
              className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${selectedChat === chat._id ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedChat(chat)}
            >
              <Image 
                src={chat?.user?.picture || "/photos/avatar.jpg"} 
                alt={chat.name} 
                width={40} 
                height={40} 
                className="rounded-full w-10 h-10 object-cover" 
              />
              <div className="ml-3 flex-1 min-w-0">
                <p className="font-medium truncate">{chat?.user?.username}</p>
                <p className="text-sm text-gray-500 truncate">{chat?.lastMessage?.message}</p>
              </div>
              <span className="ml-2 text-xs text-gray-400 whitespace-nowrap">
                {chat?.LastMessage?.createdAt}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Window */}
      <div className={`flex-1 flex items-center justify-center bg-gray-100 h-screen overflow-hidden ${selectedChat ? 'block' : 'hidden md:block'}`}>
        {selectedChat ? (
          <div className='w-full h-full relative'>
            <div className="md:hidden absolute top-4 left-4 z-10">
              <button 
                onClick={() => setSelectedChat(null)}
                className="  text-black font-bold mb-70 mr-20"
              >
            
             <IoArrowBackOutline size={25} />
              </button>
            </div>
            <ChatBox chatUser={selectedChat}/>
          </div>
        ) : (
          <div className="text-center hidden md:flex md:flex-col items-center justify-center p-4 h-screen">
            <LuMessageCircle size={60} className="hidden md:block"/>
            <p className="text-base md:text-lg font-semibold mt-4">Your messages</p>
            <p className="text-sm md:text-base text-gray-500">Send a message to start a chat.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm md:text-base hover:bg-blue-600 transition-colors"
              onClick={() => setisChat(true)}
            >
              Send message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
