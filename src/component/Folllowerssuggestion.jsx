'use client';
import { getUserById, getUserList } from '@/redux/slices/auth';
import { followUser } from '@/redux/slices/follow';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';

// Add UserSkeleton component
const UserSkeleton = () => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <Skeleton variant="circular" width={50} height={40} /> {/* Profile picture */}
        <div className="ml-3">
          <Skeleton animation="wave" height={20} width={100} /> {/* Username */}
        </div>
      </div>
      <Skeleton animation="wave" height={30} width={60} /> {/* Follow button */}
    </div>
  );
};

// Add ProfileSkeleton component
const ProfileSkeleton = () => {
  return (
    <div className='flex items-center justify-center gap-5'>
      <Skeleton variant="circular" width={50} height={40} /> {/* Profile picture */}
      <div className="ml-3">
        <Skeleton animation="wave" height={20} width={100} /> {/* Username */}
        <Skeleton animation="wave" height={16} width={80} /> {/* Name */}
      </div>
      <Skeleton animation="wave" height={30} width={60} /> {/* Switch button */}
    </div>
  );
};

export default function SuggestedUsers({ user }) {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

const router=useRouter()
  const following = user.following || [];
  console.log(following,"following users")
  
  useEffect(() => {
    handleGetUsers();
  }, [following]);
  
  const handleGetUsers = async () => {
    try {
      const result = await dispatch(getUserList());
      if (result?.data?.data) {
        const fetched = result.data.data;
        console.log("usersfetchedreuslt",fetched);
        setAllUsers(fetched);
  
      
        filterSuggestions(fetched, following);
        console.log("filteres users",suggestions)
      }
    } catch (err) {
      console.error("Error getting users:", err);
    }
  };
  
  const filterSuggestions = (allUsers, followingList) => {
    const followedIds = new Set(followingList);
    console.log(followedIds,"idsfollower")
    const filtered = allUsers.filter(
      (u) => u.id !== user.id && !followedIds.has(u.id)
    );
    setSuggestions(filtered);
  };
  
  
  const handleFollowRequest = async (id) => {
    try {
      const result = await dispatch(followUser({ friendId: id }));
  
      if (result?.payload?.status === "SUCCESS") {
        // Manually update local user.following
        if (!user.following.includes(id)) {
          user.following.push(id);
        }
  
        // Re-filter the list using updated following array
        filterSuggestions(allUsers, user.following);
      }
    } catch (err) {
      console.error("Follow error:", err);
    }
  };
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

  return (
    <div className="w-80 p-4 rounded-lg mt-5">
      {!user ? (
        <ProfileSkeleton />
      ) : (
        <div className='flex items-center justify-center gap-5'>
          <Image
            onClick={() => handlegetUserProfile(user?.id)}
            src={user?.picture || "/photos/avatar.jpg"}
            alt="pic"
            width={40}
            height={40}
            className="rounded-[100%] h-[40px] w-[50px] cursor-pointer"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">{user?.username || "Admin"}</p>
            <p className="text-xs text-gray-500">{user?.name || "Admin"}</p>
          </div>
          <button className="text-blue-500 font-semibold text-sm">Switch</button>
        </div>
      )}

      <div className="flex justify-between items-center mt-[70px] mb-4">
        <h2 className="text-gray-700 font-semibold">Suggested for you</h2>
        <button className="text-black text-sm cursor-pointer">See All</button>
      </div>

      {!suggestions || suggestions.length === 0 ? (
        // Show skeletons when suggestions are loading
        Array(3).fill(null).map((_, index) => (
          <UserSkeleton key={index} />
        ))
      ) : (
        suggestions.map((u, index) => (
          <div key={index} className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Image
                onClick={() => handlegetUserProfile(u.id)}
                src={u?.picture || "/photos/pic1.jpg"}
                alt={u?.username}
                width={40}
                height={40}
                className="rounded-[100%] h-[40px] w-[50px]"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">{u?.username}</p>
              </div>
            </div>
            <button
              onClick={() => handleFollowRequest(u.id)}
              className="text-blue-500 font-semibold text-sm cursor-pointer"
            >
              Follow
            </button>
          </div>
        ))
      )}

      <div className="text-xs text-gray-400 mt-[40px]">
        <p>About • Help • Press • API • Jobs • Privacy • Terms</p>
        <p>© 2025 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}
