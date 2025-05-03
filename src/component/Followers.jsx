'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveUser } from '@/redux/slices/follow';



export default function FollowersModal({ show, onClose }) {
  if (!show) return null;
  const followers=useSelector((state)=>state.follow.followers||[]);
  
  const dispatch=useDispatch();
// unfolllow user
const [isUnfollowers,setisUnfollowers]=useState(null);
console.log(isUnfollowers,"unfollow data")
const handleFollowersUser=(user)=>{
setisUnfollowers(user)
}
const handleUnfollowUser=async(id)=>{
  try {
    const data={
       "followerId":id
    }
    const result=await dispatch(RemoveUser(data))
    if(result.data){
      setisUnfollowers(null)
      return result.data
    }
    
  } catch (error) {
    console.log(error)
    
  }
}
  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-4 relative">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Followers</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-2 mb-4 border rounded-md"
        />

        <ul className="space-y-3">
          {followers[0]?.data?.map((follower, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={follower?.picture}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{follower?.username}</p>
                 
                    <p className="text-xs text-gray-500">{follower?.name}</p>
                
                </div>
              </div>
              <button  onClick={()=>handleFollowersUser(follower)} className="bg-gray-100 text-sm px-3 py-1 rounded hover:bg-gray-200">
                Remove
              </button>
              {isUnfollowers && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-40">
      <div className="bg-white rounded-xl w-80 p-4 text-center shadow-lg">
        <img
          src={isUnfollowers?.picture}
          alt="profile"
          className="w-20 h-20 rounded-full mx-auto mb-3"
        />
        <h2 className="text-lg font-semibold mb-1">Remove follower?</h2>
        <p className="text-sm text-gray-700 mb-4">
          Instagram won't tell <span className="font-medium">{isUnfollowers?.username}</span>
          they were removed from your followers.
        </p>
        <button
          onClick={()=>handleUnfollowUser(isUnfollowers?._id)}
          className="text-red-600 font-semibold py-2 w-full hover:bg-red-100 transition rounded-md"
        >
          Remove
        </button>
        <button
          onClick={()=>setisUnfollowers(null)}
          className="text-black py-2 w-full hover:bg-gray-100 transition rounded-md mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
            )}
            </li>
         

            
          ))}
        </ul>
      </div>
    </div>
  );
}
