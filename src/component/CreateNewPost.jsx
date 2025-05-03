import { CreatePost, ShowPost } from '@/redux/slices/post';
import { useState } from 'react';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { PiUsersThreeBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { useAuth } from '@/authentication/userauth';


const CreateNewPost = ({image,file,onClose}) => {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
     const dispatch = useDispatch();

const { user } = useAuth();
      const imagePreview = image instanceof File ? URL.createObjectURL(image) : image;
  const handleCreatePost=async()=>{
    try {
     
      console.log(image,"usersimage")
      const formData = new FormData();
      formData.append("userId",user?.id);
      formData.append("description", caption);
      formData.append("location", location);
      formData.append("images", file); 
        const   response= await dispatch(CreatePost(formData));
        if(response){
           const res=await dispatch(ShowPost());
console.log(res,"post")
          console.log(response,"new post");
          onClose();
        }
        else {
          return false
        }
        
    } catch (error) {
        console.log(error)
        
    }
    
    
    }

    
  return (
    <div className="fixed inset-0  bg-opacity-60  flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[800px] h-[500px] overflow-hidden flex">
        {/* Left side: Image preview */}
        <div className="w-1/2 bg-gray-200 relative flex items-center justify-center">
          <p className="absolute top-2 left-2 bg-black text-white text-xs rounded-full px-2 py-1">
            Click photo to tag people
          </p>
          <img
            src={imagePreview}
            alt="preview"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right side: Details */}
        <div className="w-1/2 flex flex-col justify-between p-4">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Create new post</h2>
            
            <button
  onClick={handleCreatePost}
  className={`font-semibold ${caption && location ? 'text-blue-500' : 'text-gray-400 cursor-not-allowed'}`}
  disabled={!caption || !location}
>
  Share
</button>
<RxCross2 onClick={onClose}/>

          </div>

          {/* Caption */}
          <textarea
            placeholder="Write a caption..."
            className="w-full h-24 p-2 mt-2 resize-none bg-gray-50 rounded-md border text-sm"
            maxLength={2200}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <p className="text-xs text-right text-gray-400">{caption.length}/2200</p>

          {/* Options */}
          <div className="space-y-2 text-sm text-gray-700 mt-2">
            <div className="flex items-center gap-2">
              <MdOutlineAddLocationAlt />
              <input
  type="text"
  placeholder="Add location..."
  className="w-full p-2 mt-2 bg-gray-50 rounded-md border text-sm"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>
            </div>
            <div className="flex items-center gap-2">
              <PiUsersThreeBold />
              <span>Add collaborators</span>
            </div>
          </div>

          {/* Share To */}
          <div className="mt-4 text-sm">
            <h3 className="font-semibold mb-1">Share to</h3>
            <div className="flex items-center justify-between border rounded-md px-3 py-2">
              <div className="flex items-center gap-2">
                <img
                  src={image}
                  alt="user"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{user.username}</p>
                  <p className="text-xs text-gray-500">Threads · Private</p>
                </div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition"></div>
              </label>
            </div>
          </div>

          {/* Extra */}
          <div className="mt-2 text-sm text-gray-600">
            <details>
              <summary className="cursor-pointer font-medium">Accessibility</summary>
              <p className="text-xs mt-1">Alt text, image descriptions, etc.</p>
            </details>
            <details>
              <summary className="cursor-pointer font-medium mt-2">Advanced settings</summary>
              <p className="text-xs mt-1">Control comments, likes, etc.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPost;
