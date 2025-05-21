"use client";

import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from 'next/image';


export default function SwitchAccountModal({ onClose ,user}) {
  const router =useRouter();
  // logout existing account
  const handleLogout=()=>{
    localStorage.removeItem("token");
    console.log("token removed successfully");
    router.push("/login"); 
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-[350px] rounded-lg shadow-lg p-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
        >
          <IoClose />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-center mt-2 mb-4">
          Switch accounts
        </h2>

        {/* Account List */}
        <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
          <div className="flex items-center gap-3">
            <Image
              src={user?.picture || "/photos/avatar.jpg"}
              alt={user?.username}
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
            <span className="font-medium">{user.username}</span>
          </div>
          <FaCheckCircle className="text-blue-600 text-xl" />
        </div>

        <hr className="my-4" />

        {/* Log into another account */}
        <div className="text-center">
          <button onClick={handleLogout} className="text-blue-600 font-medium hover:underline">
            Log into an Existing Account
          </button>
        </div>
      </div>
    </div>
  );
}
