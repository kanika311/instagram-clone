'use client';

import { useState } from 'react';
import Image from 'next/image';

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'follow_request',
      username: 'singh_vijayr',
      others: 7,
      time: '49m',
      profilePic: "/photos/pic1.jpg",
    },
    {
      id: 2,
      type: 'like',
      username: 'badal.sa.07',
      others: ['_chauhan.mohini', 's_mallika.manu'],
      content: 'liked your photo.',
      time: '52m',
      profilePic: "/photos/pic1.jpg",
    },
    {
      id: 3,
      type: 'story_like',
      username: 'sidd_5007',
      others: ['rajan_tapadiya_93'],
      content: 'liked your story.',
      time: '1h',
      profilePic: "/photos/pic2.jpg",
    },
    {
      id: 4,
      type: 'story_like',
      username: 'sidd_5007',
      others: ['terayaargupta7500'],
      content: 'liked your story.',
      time: '1h',
      profilePic:"/photos/pic3.jpg",
    },
    {
      id: 5,
      type: 'follow_request',
      username: 'singh_vijayr',
      others: 7,
      time: '49m',
      profilePic: "/photos/pic1.jpg",
    },
    {
      id: 6,
      type: 'like',
      username: 'badal.sa.07',
      others: ['_chauhan.mohini', 's_mallika.manu'],
      content: 'liked your photo.',
      time: '52m',
      profilePic: "/photos/pic1.jpg",
    },
    {
      id: 7,
      type: 'story_like',
      username: 'sidd_5007',
      others: ['rajan_tapadiya_93'],
      content: 'liked your story.',
      time: '1h',
      profilePic: "/photos/pic2.jpg",
    },
    {
      id: 8,
      type: 'story_like',
      username: 'sidd_5007',
      others: ['terayaargupta7500'],
      content: 'liked your story.',
      time: '1h',
      profilePic:"/photos/pic3.jpg",
    },
    {
      id: 9,
      type: 'follow_request',
      username: 'singh_vijayr',
      others: 7,
      time: '49m',
      profilePic: "/photos/pic1.jpg",
    },
    {
      id: 10,
      type: 'like',
      username: 'badal.sa.07',
      others: ['_chauhan.mohini', 's_mallika.manu'],
      content: 'liked your photo.',
      time: '52m',
      profilePic: "/photos/pic1.jpg",
    },
    {
      id: 11,
      type: 'story_like',
      username: 'sidd_5007',
      others: ['rajan_tapadiya_93'],
      content: 'liked your story.',
      time: '1h',
      profilePic: "/photos/pic2.jpg",
    },
    {
      id: 12,
      type: 'story_like',
      username: 'sidd_5007',
      others: ['terayaargupta7500'],
      content: 'liked your story.',
      time: '1h',
      profilePic:"/photos/pic3.jpg",
    },
  ]);

  return (
    <div className="fixed top-0 left-16 lg:left-60 md:left-16 sm:left-16 xs:left-16 w-[300px] lg:w-[400px] md:w-[300px] sm:w-[150px] h-[100vh] p-4 bg-white shadow-md rounded-lg overflow-y-auto z-[9999]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Notifications</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <span className="text-2xl">&times;</span>
        </button>
      </div>

      {/* Follow Requests */}
      <div className="flex items-center gap-3 mt-4 p-3 border-b cursor-pointer hover:bg-gray-100 rounded-md">
        <Image
          src="/photos/pic1.jpg"
          alt="Follow Request"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm sm:text-base truncate">Follow requests</p>
          <span className="text-gray-500 text-xs sm:text-sm">
            {notifications[0].username} + {notifications[0].others} others
          </span>
        </div>
        <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
      </div>

      {/* Notifications List */}
      <div className="mt-4 space-y-2">
        <div className="grid grid-cols-1 justify-end mr-10 w-full">
          {notifications.slice(1).map((notif) => (
            <div key={notif.id} className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md">
              <Image
                src={notif.profilePic}
                alt="User"
                width={40}
                height={40}
                className="rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm">
                  <span className="font-semibold">{notif.username}</span>
                  {notif.others?.length > 0 && (
                    <span> and {notif.others.join(', ')} </span>
                  )}
                  {notif.content}
                </p>
                <span className="text-gray-500 text-xs">{notif.time}</span>
              </div>

              {notif.type === 'follow_request' && (
                <div className="ml-auto flex gap-2 flex-shrink-0">
                  <button className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap">Confirm</button>
                  <button className="bg-gray-200 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
