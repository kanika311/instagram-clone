"use client";

import { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { PostLike, ShowPost } from "@/redux/slices/post";
import PostDetail from "./Post";
import { CiHeart } from "react-icons/ci";
import postApi from "@/mocks/post";
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';

export default function ReelsPage() {
  const dispatch=useDispatch();
  const postList = useSelector((state) => state.post?.postList || []);
  console.log(postList,"list of post")
  const [isLiked, setIsLiked] = useState({});

  const [selectedPost,setSelectedPost]=useState(null)  
const[isPost ,setIsPost]=useState(false)

// postlist
  const handlePostList = useCallback(async () => {
    try {
      const result = await dispatch(ShowPost());
      if (result) {
        console.log(result, "result of get post list");
      }
    } catch (error) {
      console.log(error, "error in get post list");
    }
  }, [dispatch]);

  useEffect(() => {
    handlePostList();
  }, [handlePostList]);
  console.log(postList,"post")
  // post detail
  const handlePostDetails = (post) => {
    setSelectedPost(post);
    setIsPost(true);
  };
  // post like
  const handlePostLike = async (id) => {
    if (isLiked[id]) return; // prevent multiple likes
  
    try {
      const response = await postApi.postLike(id)

  
      console.log("API Response", response);
  
      if (response) {
      
        const response=await dispatch(ShowPost());
        console.log(response,"postlike")
      } else {
        console.log("Like failed: ", response);
      }
    } catch (error) {
      console.log("Error in liking post:", error);
    }
  };
  
  // Add ReelSkeleton component
  const ReelSkeleton = () => {
    return (
      <div className="mb-16">
        <Skeleton animation="wave" height={24} width="30%" sx={{ mb: 1 }} /> {/* Username */}
        <Skeleton animation="wave" height={20} width="60%" sx={{ mb: 2 }} /> {/* Description */}
        <Skeleton 
          variant="rectangular" 
          height={400} 
          animation="wave"
          sx={{ mb: 2, borderRadius: 2 }}
        /> {/* Video/Image */}
        <div className="flex items-start justify-start gap-5 mt-2">
          <Skeleton animation="wave" height={40} width={40} /> {/* Like button */}
          <Skeleton animation="wave" height={40} width={40} /> {/* Comment button */}
          <Skeleton animation="wave" height={40} width={40} /> {/* Share button */}
        </div>
      </div>
    );
  };
  
  return (
    <div className="h-auto overflow-y-auto no-scrollbar w-[70%] py-6">
      {!postList || postList.length === 0 ? (
        // Show skeletons when reels are loading
        Array(3).fill(null).map((_, index) => (
          <ReelSkeleton key={index} />
        ))
      ) : (
        postList.map((reel) => (
          <div key={reel?.id} className="mb-16">
            <p className="font-bold text-lg">@{reel?.userId?.username}</p>
            <p className="text-sm">{reel?.description}</p>
            {Array.isArray(reel?.posts) &&
              reel.posts.map((img, imgIndex) => (
                <div key={imgIndex} className="text-black mb-4">
                  <Image
                    src={img.pic}
                    alt={`Post by ${img?.username}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    onClick={() => handlePostDetails(reel)}
                  />
                </div>
              ))}
            <div className="flex items-start justify-start gap-5 mt-2">
              <div className="flex flex-col items-center cursor-pointer">
                {isLiked[reel?.id] ? (
                  <FaHeart size={25} color="red" onClick={() => handlePostLike(reel?.id)} />
                ) : (
                  <CiHeart size={25} onClick={() => handlePostLike(reel?.id)} />
                )}
                <span className="text-black text-sm">
                  {(reel?.likeCount || 0) + (isLiked[reel?.id] ? 1 : 0)}
                </span>
              </div>
              <button onClick={() => handlePostDetails(reel)} className="text-white flex flex-col items-center">
                <FaComment className="text-blue-500 text-2xl" />
                <span>Comment</span>
              </button>
              <button className="text-white flex flex-col items-center">
                <FaShare className="text-green-500 text-2xl" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))
      )}
      {isPost && selectedPost && (
        <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-black/50 flex items-center justify-center">
          <PostDetail post={selectedPost} onClose={() => setIsPost(false)} />
        </div>
      )}
    </div>
  );
}

