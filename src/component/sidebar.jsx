'use client';

import { useEffect, useRef, useState } from 'react';
import { Home, Search, Compass, Video, MessageCircle, Heart, PlusSquare, Menu } from 'lucide-react';
import { RxAvatar } from "react-icons/rx";
import { usePathname, useRouter } from 'next/navigation';
import Notifications from './Notification';
import { IoLogOutOutline } from "react-icons/io5";
import { MdCreateNewFolder } from 'react-icons/md';
import CreatePost from './CreatePopup';
import { useDispatch, useSelector } from 'react-redux';
import { SearchUser } from '@/redux/slices/message';
import { getUserById } from '@/redux/slices/auth';


const Sidebar = ({ setActiveSection }) => {
    const pathname = usePathname();
//    search bar open
    const [isSearchOpen, setIsSearchOpen] = useState(false); // ✅ Initially closed
const dispatch=useDispatch();
    const searchRef = useRef(null);

    // Function to toggle search drawer
    const toggleSearchDrawer = () => {
      setIsSearchOpen((prev) => !prev);
    };
  
    // Close search when clicking outside
    useEffect(() => {
      function handleClickOutside(event) {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setIsSearchOpen(false); // Close search drawer
        }
      }
  
      if (isSearchOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSearchOpen]);
  
    // notifications
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // ✅ Initially closed

    const toggleNotificationDrawer = () => {
        setIsNotificationOpen((prev) => !prev);
    };
    const notificationRef = useRef(null);

    // Close notifications when clicking outside
    useEffect(() => {
      function handleClickOutside(event) {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
          setIsNotificationOpen(false); // Close notification panel
        }
      }
  
      if (isNotificationOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isNotificationOpen]);

  // logout
  const router=useRouter();
  const handleLogout=()=>{
localStorage.removeItem("token")
console.log("token removed");
router.push('/login')
  }
// create post 
const[isCreatePopup,setIsCreatePopup]=useState(false);
const toggleCreatePopup=()=>{
  setIsCreatePopup(!isCreatePopup);
}
// search user
const searchResults = useSelector(state => state.message.search);
const [search,setSearch]=useState("");
console.log(searchResults,"search results")





// search user
const handleSearchUser=async()=>{
if (!search.trim()) return;
try {
 const searchData = {"searchKey": search}
  const result = await dispatch(SearchUser(searchData));
  if(result){
    console.log(result,"result of search user")
    return result;
  }
 
} catch (error) {
  console.log(error,"error in search user")
}
}
// get user by id
  const handlegetUserProfile=async(id)=>{
    try {
      router.push(`/profile/${id}`)
      const result=await dispatch(getUserById(id))
      if(result){
        console.log(result,"result of get user by id")
      }
      return false
    } catch (error) {
      console.log(error,"error in get user by id")
    }
  }
  
    const menuItems = [
        { name: 'Home', href: '/', icon: <Home />, action: () => {
          if (typeof setActiveSection === "function") {
            setActiveSection("home");
          } else {
            router.push("/");
          }
        } },
        { name: 'Search', href: '#', icon: <Search />, action: toggleSearchDrawer },
        { name: 'Reels', href: '#', icon: <Video />, action: () => setActiveSection("reels") },
        { name: 'Messages', href: '/messages', icon: <MessageCircle />, action: () => setActiveSection("message") },
        { name: 'Notifications', href: '#', icon: <Heart />, action: toggleNotificationDrawer },
        { name: 'create', href: "#", icon: <MdCreateNewFolder size={25}/>, action: toggleCreatePopup },
        { name: 'Profile', href: '#', icon: <RxAvatar />, action: () => {
          if (typeof setActiveSection === "function") {
            setActiveSection("profile");
          } else {
            router.push("/profile");
          }
        }},
        { name: 'logout', href: '#', icon: <IoLogOutOutline />, action: handleLogout },
    ];

    return (
        <aside className="h-[100%] py-10 my-0 pl-4 bg-white shadow-md flex flex-col w-16 lg:w-60 md:w-16 sm:w-16 xs:w-16">
            <h1 className="text-2xl font-bold mb-8 italic hidden lg:block">Instagram</h1>

            {/* Sidebar Menu */}
            <nav className="flex flex-col space-y-3">
                {menuItems.map(({ name, href, icon, action }) => (
                    <button
                        key={name}
                        onClick={action || null}
                        className={`flex items-center gap-3 p-2 rounded-lg text-lg w-full text-left cursor-pointer
                        ${pathname === href ? 'font-bold' : 'text-gray-600'} hover:bg-gray-100`}
                    >
                        {icon} 
                        <span className="hidden lg:inline">{name}</span>
                    </button>
                ))}
            </nav>

            {/* 🔹 Search Drawer */}
            {isSearchOpen &&
            <div 
                className={`fixed z-[9999] top-0 left-16 lg:left-60 md:left-16 sm:left-16 xs:left-16 h-full w-[300px] lg:w-[20%] md:w-[300px] sm:w-[300px] xs:w-[300px] bg-white shadow-md transition-transform duration-300 ${
                    isSearchOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-4">
                    <h2 className="text-2xl font-semibold">Search</h2>

                    {/* Search Input */}
                    <div className="relative mt-2">
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleSearchUser();
                            }}

                            className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none"
                        />
                        <button
                            className="absolute right-3 top-2 text-gray-400"
                            onClick={() => setIsSearchOpen(false)} // 🔹 Close when clicking ✖
                        >
                            ✖
                        </button>
                    </div>

                  {/*  */}
                  <div className="px-4 py-2">
      {searchResults?.result && searchResults.result.length > 0 ? (
        searchResults.result.map(user => (
          <div 
            key={user._id} 
            className="py-2 border-b hover:bg-gray-100 cursor-pointer"
           
          >
            <div className="flex items-center justify-between">
              <div onClick={()=> handlegetUserProfile(user?._id)} className="flex items-center gap-2">
                <img 
                  src={user?.picture || "/photos/avatar.jpg"} 
                  alt={user?.name} 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{user?.username}</div>
                  {user?.name && <div className="text-sm text-gray-500">{user?.name}</div>}
                </div>
              </div>
          
            </div>
          </div>
        ))
      ) : search ? (
        <div className="text-gray-500 py-2 text-center">No user found</div>
      ) : null}
    </div>
                </div>
            </div>
}
{/* notofications */}
{isNotificationOpen &&
<div ref={notificationRef} >
    <Notifications/>
</div>
}
{/* Create */}
{isCreatePopup && (
  <div className='fixed z-[9999] '>
    <CreatePost onClose={toggleCreatePopup}/>
  </div>
)}
        </aside>
    );
};

export default Sidebar;
