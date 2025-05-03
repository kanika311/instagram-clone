'use client';

import { useEffect, useState } from "react";
import Sidebar from "../component/sidebar.jsx";
import ReelSection from "@/component/reel.jsx";
import Profile from "@/component/profile.jsx";
import StorySection from "../component/Stories.jsx";
import "./globals.css";

import EditProfile from "@/component/editProfile.jsx";
import Messages from "@/component/Message.jsx";

import SuggestedUsers from "@/component/Folllowerssuggestion.jsx";

import { useAuth } from "@/authentication/userauth.js";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserById } from "@/redux/slices/auth.js";
import { followersList, followingList } from "@/redux/slices/follow.js";
import { useRouter } from "next/navigation";


export default function Home() {
  const [activeSection, setActiveSection] = useState("home"); // Default section
const dispatch = useDispatch();
// getuser APi
const user = useSelector((state) => state.auth.user);



console.log(user?.name, "userlist"); 

const handleGetProfile = async() => {
 const result = await dispatch(getUser())
 if(result){
  return true
 }
}

useEffect(()=>{
  handleGetProfile()
},[activeSection])
// post followers
const handlefollowersList=async()=>{
  try {
    const result=await dispatch(followersList())
    if(result){
     
      return result.data;
    }
    return false
    
  } catch (error) {
    console.log(error)
    
  }
}
useEffect(()=>{
  handlefollowersList();
},[])

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
// get user by id
const handlegetUserProfile=async()=>{
  try {
    // Reset to current user's profile
    const currentUserId = user?.id;
    if (!currentUserId) {
      console.log("No user ID available");
      return false;
    }
    const result = await dispatch(getUserById(currentUserId));
    if(result){
      console.log(result,"result of get user by id");
      setActiveSection("profile");
    }
    return false;
  } catch (error) {
    console.log(error,"error in get user by id");
  }
}
useEffect(()=>{
  if (activeSection === "profile") {
    handlegetUserProfile();
  }
},[activeSection, user])
  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <Profile setActiveSection={setActiveSection} onClick={handlegetUserProfile}/>;
        case "editprofile":
          return <EditProfile user={user}/>;
          case "reels":
            return (
            <div className="h-[500px]  flex-col  overflow-hidden mt-10 rounded-xl w-[60%] flex items-center justify-center mx-[180px] z-0">
            <ReelSection />
          
            </div>
              );
              case "message":
                return <Messages user={user}/>;

          
      case "home":
      default:
        return (
          <div>
            <div className="flex items-center justify-center">
              <StorySection />
            </div>
            <div className="h-[500px] flex flex-col items-center justify-center overflow-hidden mt-10 rounded-xl ">
              <ReelSection />
            </div>
          </div>
        );
    }
  };

 
    return (
    
      <div className="relative grid grid-cols-12 h-screen border-r-2px border-[#dbdbdb] p-0 m-0 z-0">
        <div className="col-span-1 lg:col-span-2 md:col-span-1 sticky h-[100%]">
          <Sidebar setActiveSection={setActiveSection} />
        </div>
    
        {activeSection === "home" ? (
          <>
            <div className="col-span-11 lg:col-span-7 md:col-span-11 w-full">{renderContent()}</div>
            <div className="hidden lg:block col-span-3 h-screen w-full">
             <SuggestedUsers user={user}/>
            </div>
          </>
        ) : (
          <div className="col-span-11 lg:col-span-10 md:col-span-11 w-full">{renderContent()}</div>
        )}
      </div>
      
    
  );
}
