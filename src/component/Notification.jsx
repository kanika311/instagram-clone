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
    <div className=" fixed  top-0 left-60 w-[400px] h-[100%] p-4 bg-white shadow-md rounded-lg overflow-y-auto">
      {/* Header */}
      <h2 className="text-xl font-bold">Notifications</h2>

      {/* Follow Requests */}
      <div className="flex items-center gap-3 mt-4 p-3 border-b cursor-pointer hover:bg-gray-100 rounded-md">
        <Image
          src="/photos/pic1.jpg"
          alt="Follow Request"
          width={40}
          height={60}
          className="rounded-[50%]"
        />
        <div>
          <p className="font-semibold">Follow requests</p>
          <span className="text-gray-500 text-sm">
            {notifications[0].username} + {notifications[0].others} others
          </span>
        </div>
        <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>

      {/* Notifications List */}
      <div className="mt-4">
        {notifications.slice(1).map((notif) => (
          <div key={notif.id} className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md">
            <Image
              src={notif.profilePic}
              alt="User"
              width={40}
              height={60}
              className="rounded-[50%]"
            />
            <div>
              <p className="text-sm">
                <span className="font-semibold">{notif.username}</span>
                {notif.others?.length > 0 && (
                  <span> and {notif.others.join(', ')} </span>
                )}
                {notif.content}
              </p>
              <span className="text-gray-500 text-xs">{notif.time}</span>
            </div>

            {notif.type === 'follow_request' && (
              <div className="ml-auto flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Confirm</button>
                <button className="bg-gray-200 px-3 py-1 rounded text-sm">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
