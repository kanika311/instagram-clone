'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveUser } from '@/redux/slices/follow';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function FollowersModal({ show, onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [isUnfollowers, setisUnfollowers] = useState(null);

  if (!show) return null;

  const handleFollowersUser = (user) => {
    setisUnfollowers(user);
  };

  const handleUnfollowUser = async (id) => {
    try {
      const data = {
        "followerId": id
      };
      const result = await dispatch(RemoveUser(data));
      if (result.data) {
        setisUnfollowers(null);
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
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
                <Image
                  src={follower?.picture}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{follower?.username}</p>
                  <p className="text-xs text-gray-500">{follower?.name}</p>
                </div>
              </div>
              <button onClick={() => handleFollowersUser(follower)} className="bg-gray-100 text-sm px-3 py-1 rounded hover:bg-gray-200">
                Remove
              </button>
              {isUnfollowers && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-40">
                  <div className="bg-white rounded-xl w-80 p-4 text-center shadow-lg">
                    <Image
                      src={isUnfollowers?.picture}
                      alt="profile"
                      width={80}
                      height={80}
                      className="rounded-full mx-auto mb-3"
                    />
                    <h2 className="text-lg font-semibold mb-1">Remove follower?</h2>
                    <p className="text-sm text-gray-700 mb-4">
                      Instagram won&apos;t tell <span className="font-medium">{isUnfollowers?.username}</span>
                      they were removed from your followers.
                    </p>
                    <button
                      onClick={() => handleUnfollowUser(isUnfollowers?._id)}
                      className="text-red-600 font-semibold py-2 w-full hover:bg-red-100 transition rounded-md"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => setisUnfollowers(null)}
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
