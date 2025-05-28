'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ShowPost } from '@/redux/slices/post';
import PostDetail from './Post';
import { followersList, followingList, unfollowUser } from '@/redux/slices/follow';
import FollowersModal from './Followers';
import FollowingModal from './Following';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const Profile = ({ setActiveSection,onClick }) => {
  const [selectedTab, setSelectedTab] = useState('posts');
  const user = useSelector((state) => state.auth.userbyid);
  const [selectedPost,setSelectedPost]=useState(null)
  const following=useSelector((state)=>state.follow.following||[]);
  const followers=useSelector((state)=>state.follow.followers||[]);
const[isPost ,setIsPost]=useState(false)
 
  const tabs = [
    { name: 'Posts', key: 'posts' },
    { name: 'Reels', key: 'reels' },
    { name: 'Saved', key: 'saved' },
    { name: 'Tagged', key: 'tagged' },
  ];console.log(user,"user")
  // edit profile

  const handleEditProfile=()=>{
setActiveSection("editprofile")
  }
  const dispatch=useDispatch();


// post details
const handlePostDetails = (post) => {
  setSelectedPost(post);
  setIsPost(true);
};
// followers list
const [isFollowers,setIsFollowers]=useState(false);
const  handlefollowers=()=>{
  setIsFollowers(true);
}

// following api
const [isFollowing,setIsFollowing]=useState(false);
const  handlefollowing=()=>{
  setIsFollowing(true);
}
const handlefollowingList = useCallback(async () => {
  try {
    const result = await dispatch(followingList());
    if (result) {
      console.log(result, "result of get following list");
    }
  } catch (error) {
    console.log(error, "error in get following list");
  }
}, [dispatch]);

useEffect(() => {
  handlefollowingList();
}, [handlefollowingList]);

// Add this skeleton component at the top with other components
const PostSkeleton = () => {
  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden">
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height="100%" 
        animation="wave"
        sx={{ bgcolor: 'grey.200', transform: 'scale(1)', borderRadius: '4px' }}
      />
    </div>
  );
};

  return (
    <div className="w-full max-w-5xl mx-auto p-2 sm:p-4 md:p-6 Z-0">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <Image
          src={user?.picture || "/photos/avatar.jpg"}
          alt="Profile Picture"
          width={180}
          height={250}
          className="rounded-[100%] border p-1 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] object-cover"
        />
        <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <h2 className="text-xl font-semibold">{user?.username}</h2>
            <div className="flex gap-2">
              <button onClick={handleEditProfile} className="border px-4 py-1 rounded-md text-sm sm:text-base">Edit Profile</button>
              <button className="text-xl">⚙</button>
            </div>
          </div>
          <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 mt-2">
            <span><strong> {user?.post?.length||0}</strong> posts</span>
            <span onClick={handlefollowers} className="cursor-pointer">
              <strong>{followers[0]?.data?.length ||0}</strong> followers
            </span>
            <span onClick={handlefollowing} className="cursor-pointer">
              <strong>{following[0]?.data?.count ||0}</strong> following
            </span>
          </div>
          <p className="mt-2 font-semibold">{user?.name}</p>
        </div>
      </div>

{isFollowers&&(
  <FollowersModal show={isFollowers}
  onClose={() => setIsFollowers(false)}
  followers={followers}/>
)}
{isFollowing&&(
  <FollowingModal show={isFollowing}
  onClose={() => setIsFollowing(false)}
  following={following}/>
)}
      {/* Tabs */}
      <div className="border-b mt-6 flex justify-center gap-4 sm:gap-10 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`py-2 px-2 sm:px-4 text-sm whitespace-nowrap ${
              selectedTab === tab.key ? 'border-b-2 border-black font-semibold' : 'text-gray-500'
            }`}
            onClick={() => setSelectedTab(tab.key)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {selectedTab === 'posts' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {!user?.post || user?.post?.length === 0 ? (
            // Show skeletons when posts are loading
            Array(6).fill(null).map((_, index) => (
              <div key={index} className="group relative">
                <PostSkeleton />
              </div>
            ))
          ) : (
            // Show actual posts when data is available
            user?.post?.map((item, index) => (
              <div key={index} className="group relative">
                {Array.isArray(item.posts) &&
                  item.posts.map((img, imgIndex) => (
                    <div
                      key={`${index}-${imgIndex}`}
                      className="relative w-[90%] h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden"
                    >
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                        <Image
                          src={img?.pic}
                          onClick={() => handlePostDetails(item)}
                          alt={`Post ${index + 1} - Image ${imgIndex + 1}`}
                          width={150}
                          height={500}
                          className="w-full h-full object-cover group-hover:opacity-60 transition-all duration-300"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            ))
          )}
        </div>
      )}

      {/* Post Detail Modal */}
      {isPost && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <PostDetail post={selectedPost} onClose={() => setIsPost(false)} />
        </div>
      )}
    </div>
  );
};

export default Profile;