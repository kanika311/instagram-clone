'use client';

import { unfollowUser } from "@/redux/slices/follow";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getUserById } from "@/redux/slices/auth";

export default function FollowingModal({ show, onClose }) {
  if (!show) return null;
const router=useRouter()
  const dispatch = useDispatch();
  const following = useSelector((state) => state.follow.following || []);
  const [selectedUser, setSelectedUser] = useState(null); // Holds the user selected for unfollow
console.log(following,"following")
  const handleUnfollowUser = async (id) => {
    try {
      const data = {
        friendId: id,
      };
      const result = await dispatch(unfollowUser(data));
      if (result.data) {
        setSelectedUser(null); // Close the modal after successful unfollow
        return result.data;
      }
    } catch (error) {
      console.log(error);
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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-xl p-4 overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Following</h2>
          <button onClick={onClose} className="text-xl font-semibold">✕</button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="w-full mb-4 px-3 py-2 border rounded-md text-sm"
        />

        {/* Following List */}
        <ul className="space-y-4">
          {following[0]?.data?.data?.map((user, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  onClick={() => handlegetUserProfile(user._id)}
                  src={user?.picture || "/photos/avatar.jpg"}
                  alt="avatar"
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-gray-500">{user?.name}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(user)}
                className="bg-gray-100 px-3 py-1 text-sm rounded-md cursor-pointer"
              >
                Following
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Unfollow Confirmation Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-100 bg-black bg-opacity-40">
          <div className="bg-white rounded-xl w-80 p-4 text-center shadow-lg">
            <img
              src={selectedUser?.picture || "/photos/avatar.jpg"}
              alt="profile"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <p className="text-sm text-gray-800 mb-2">
              If you change your mind, you'll have to request to follow{" "}
              <span className="font-semibold">{selectedUser?.username}</span> again.
            </p>
            <button
              onClick={() => handleUnfollowUser(selectedUser._id)}
              className="text-red-600 font-semibold py-2 w-full hover:bg-red-100 transition rounded-md"
            >
              Unfollow
            </button>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-black py-2 w-full hover:bg-gray-100 transition rounded-md mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
