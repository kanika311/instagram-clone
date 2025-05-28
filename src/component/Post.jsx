'use client';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegComment } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { CommentReply, DeletePost, getComment, postComment, PostLike, ShowPost } from '@/redux/slices/post';
import { RxCross1 } from 'react-icons/rx';
import { useState, useEffect, useCallback } from 'react';
import { FaHeart } from "react-icons/fa"; // filled red heart icon
import { MdDelete } from 'react-icons/md';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { DeleteComment } from '@/redux/slices/post';
import { useAuth } from '@/authentication/userauth';
import postApi from '@/mocks/post';


const PostDetail = ({ post, onClose  }) => {
  const dispatch=useDispatch();
  const { postList } = useSelector((state) => state.post);
  const updatedPost = postList.find(p => p._id === post._id || p.id === post._id) || post;

  const { Comments } = useSelector((state) => state.post);
 const { user } = useAuth();       
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(updatedPost?.likeCount || 0);

  const [isComment, setComment] = useState(null);
  
  // Add effect to check initial like status
  useEffect(() => {
    setIsLiked(updatedPost?.isLiked || false);
    setLikeCount(updatedPost?.likeCount || 0);
  }, [updatedPost]);

  console.log(updatedPost,"postlikeupdat")
  //post like
  const id = updatedPost?.id;
console.log(Comments,"comment")
const handlePostLike = async () => {
  try {
    const response = await postApi.postLike(id);

    if (response) {
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      await dispatch(ShowPost());
    } else {
      console.log("Like failed");
    }
  } catch (error) {
    console.log("Error in liking post:", error);
  }
};




  



  // deletepost


  const handleDeletePost = async (id) => {
    try {
      const result = await dispatch(DeletePost(id))
      if (result) {
        const result = await dispatch(getComment(updatedPost?.id))
        console.log(result,"postdelte")
      
        return result;

      }
      return false

    } catch (error) {
      console.log(error)

    }
  }
  // comment api
  const handleComment = async () => {
    if (!isComment?.trim()) return;

    try {
      if (selectedCommentId) {
        const replyData = {
          commentId: selectedCommentId,
          text: isComment,
        };
        const result = await dispatch(CommentReply(replyData));
        if (result) {
          // Refresh comments immediately after reply
          await dispatch(getComment(updatedPost?.id));
          setComment("");
          setSelectedCommentId(null);
          return result;
        }
      } else {
        const commentData = {
          postId: updatedPost?.id,
          text: isComment,
        };
        const result = await dispatch(postComment(commentData));
        if (result) {
          // Refresh comments immediately after posting
          await dispatch(getComment(updatedPost?.id));
          setComment("");
          return result;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // getcomment
  const handleGetComment = useCallback(async (postId) => {
    try {
      const result = await dispatch(getComment(postId));
      if (result) {
        console.log(result, "result of get comments");
      }
    } catch (error) {
      console.log(error, "error in get comments");
    }
  }, [dispatch]);

  useEffect(() => {
    if (post?.id) {
      handleGetComment(post.id);
    }
  }, [post?._id, handleGetComment]);

  // delete
  const [isDelete, setIsDelete] = useState(false);

  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const handledelete = (commentId) => {
    setSelectedCommentId(commentId);
    setIsDelete(true);
  };
  const handleDeleteComment = async () => {
    try {
      const result = await dispatch(DeleteComment(selectedCommentId))
      if (result) {
        setIsDelete(false)
        return true
      }
      return false

    } catch (error) {
      console.log(error)

    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center px-2">
    <div className="bg-white w-full max-w-5xl h-[90vh] md:h-[90vh] flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg relative">
      {/* Left: Image */}
      {Array.isArray(post.posts) &&
        post.posts.map((img, imgIndex) => (
          <div key={imgIndex} className="w-full md:w-1/2 h-[300px] md:h-full flex items-center justify-center bg-black">
            <Image
              src={img?.pic||'/photos/avatar.jpg'}
              alt="Post"
              width={700}
              height={1000}
              className="h-full object-contain max-w-full"
            />
          </div>
        ))}
  
      {/* Right: Post content */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        {/* Top: User info */}
        <div className="p-4 border-b flex items-center gap-4 sm:gap-8">
          <Image
            src={user?.picture||'/photos/avatar.jpg'}
            alt="User"
            width={40}
            height={40}
            className="rounded-full w-10 h-10 object-cover"
          />
          <h2 className="font-semibold text-sm sm:text-base">{user.username}</h2>
          <MdDelete size={22} onClick={() => {
            handleDeletePost(id);
            onClose();
          }} className="cursor-pointer" />
        </div>
  
        {/* Middle: Caption + Comments */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Caption */}
          {updatedPost.caption && (
            <div>
              <p className="text-sm">
                <span className="font-semibold">{updatedPost?.location}</span> {updatedPost?.description}
              </p>
            </div>
          )}
  
          {/* Comments */}
          {Comments?.map((comment, i) => (
            <div key={i}>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <Image src={comment?.userId?.picture||'/photos/avatar.jpg'} alt='' width={30} height={30} className='rounded-full' />
                  <p className="text-sm">
                    <span className="font-semibold">{comment?.userId?.name}</span> {comment?.text}
                  </p>
                </div>
                <div className='flex flex-row justify-start gap-10 items-start'>
                  <div className='flex flex-col gap-4'>
                    <span
                      onClick={() => {
                        setSelectedCommentId(comment.id);
                        setComment(`@${comment?.userId?.name} `);
                      }}
                      className='text-md font-[400] text-gray-500 cursor-pointer'
                    >
                      Reply
                    </span>
                    {/* Replies */}
                    {comment.replies?.length > 0 && (
                      <div className="pl-4 mt-2 border-l border-gray-200">
                        {comment.replies.map((reply, j) => (
                          <div key={j} className="flex items-start gap-3 mt-2">
                            <Image
                              src={reply?.userId?.picture}
                              alt=""
                              width={26}
                              height={26}
                              className="rounded-full object-cover w-6 h-6"
                            />
                            <div>
                              <p className="text-sm">{reply?.text}</p>
                              <div className="flex text-xs text-gray-500 gap-3 mt-1">
                                <span
                                  onClick={() => {
                                    setSelectedCommentId(reply.id);
                                    setComment(`@${reply?.userId?.name} `);
                                  }}
                                  className="cursor-pointer text-blue-500 font-bold"
                                >
                                  Reply
                                </span>
                                <HiOutlineDotsHorizontal size={14} onClick={() => handledelete(reply.id)} className="cursor-pointer" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <HiOutlineDotsHorizontal size={22} onClick={() => handledelete(comment.id)} className="cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Delete Confirmation Modal */}
        {isDelete && (
          <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl w-64 shadow-lg text-center">
              <button
                onClick={handleDeleteComment}
                className="w-full py-3 text-red-500 font-semibold border-b"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDelete(false)}
                className="w-full py-3 font-semibold text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
  
        {/* Bottom: Likes + Input */}
        <div className="border-t p-4">
          <div className="flex justify-start items-center gap-5 mb-2 cursor-pointer">
            {isLiked ? (
              <FaHeart size={22} color="red" onClick={handlePostLike} />
            ) : (
              <CiHeart size={22} color="black" onClick={handlePostLike} />
            )}
            <FaRegComment size={22} />
          </div>
          <p className="text-sm mb-2">
            ❤️ Likes <strong>{likeCount}</strong>
          </p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={isComment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border rounded-full px-4 py-2 text-sm"
            />
            <button onClick={handleComment} className="text-blue-500 font-semibold">Post</button>
          </div>
        </div>
      </div>
    </div>
  
    {/* Close Button */}
    <RxCross1 size={26} onClick={onClose} color='gray' className='absolute top-5 right-5 md:top-[5%] md:right-[8%] cursor-pointer' />
  </div>
  
  );
};

export default PostDetail;
