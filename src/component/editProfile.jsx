'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, uploadUser } from '@/redux/slices/auth';






export default function EditProfile({user}) {

 
  const dispatch=useDispatch();
 const id=user?.id
 console.log(id,"usersid")

 const Usersimage=user?.picture
 
 
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // actual file to send

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // preview
      setImageFile(file); // for upload
      console.log(file.name, "profileimage of users");
    }
  };
  
  const uploadUsersImage = async () => {
    try {
      if (!imageFile || !id) return;
  
      const formData = new FormData();
      formData.append('profilePicture', imageFile); 
  
      const response = await dispatch(uploadUser(id, formData));
     
      if (response) {
        console.log(response,"full response")
      } else {
        console.log("response not found")
      }
    } catch (error) {
      console.log(error)
    }
  }


    const[isUploadPhoto,setIsUploadPhoto]=useState(false);
    const handleUploadphoto=()=>{
         setIsUploadPhoto(!isUploadPhoto)
    }
    const [username, setUsername] = useState(user?.username || "");
const [name, setName] = useState(user?.name || "");

  const [bio, setBio] = useState('Aggarwal queen😍😍\n20+ 😁😬\n👑👸');
  const [gender, setGender] = useState(user?.name || 'Female');
const[showSuggestions,setShowSuggestions]=useState(false)

// update users
const handleUpdateUser=async(id)=>{
  try {
    const data = {
      username,
      name,
      bio,
      gender,
      showSuggestions,
    };
    console.log("Sending update payload:", data);
    const response=await dispatch(updateUser(id,data))
    if(response){
      return true
    }
    return false
  } catch (error) {
    console.log(error)
    
  }
}
  return (
   

    <div className=" col-span-10 w-[60%] mx-auto bg-white  p-6 rounded-lg">
      <div className='mb-[20px]'>
        <span  className="text-lg font-bold text-black ">EDIT PROFILE</span>
      </div>
      {/* Profile Header */}
      <div className="flex items-center  justify-between  mb-4 bg-[#efefef] max-h-[80px] p-10 rounded-md">
      <div className="flex items-center  justify-center gap-5">
      <Image
  src={Usersimage || "/photos/pic1.jpg"} // fallback image
  alt="Profile Picture"
  width={60}
  height={50}
  className="rounded-full object-cover"
/>
        <div className="ml-4">
        <p className="text-md font-bold text-black ">{user?.username}</p>
              <p className="text-xs text-gray-500">
            {user?.name}
              </p>
     
        </div>
        </div>
        <button onClick={handleUploadphoto} className="mt-1 px-3 py-1 text-blue-500 border rounded-md">Change photo</button>
      </div>
    
     {isUploadPhoto && (
      <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-xl w-[350px] text-center">
          <img
            src={image}
            alt="profilePhoto"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold mb-1">Synced profile photo</h2>
          <p className="text-sm text-gray-500 mb-4">Instagram, Facebook</p>
    
          <div className="space-y-4 flex flex-col items-center justify-center">
      {/* Input field for selecting file */}
      <input
        type="file"
        accept="image/*"
        placeholder='upload photo'
        onChange={handleImageChange}
        className=" text-sm"
      />

      {/* Upload button */}
      <button
      onClick={() =>{
         uploadUsersImage(id);
        setIsUploadPhoto(false)
      }
      }
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm"
      >
        Upload Photo
      </button>
      </div>
          
          <button className="text-red-500 text-sm mb-2 hover:underline block w-full">
            Remove Current Photo
          </button>
          <button
            onClick={handleUploadphoto}
            className="text-sm text-gray-700 hover:underline block w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
    
     

      {/* Website (Disabled) */}
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
  type="text"
  placeholder="username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="w-full p-2 border rounded"
/>
       
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">name</label>
        <input
  type="text"
  placeholder="name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full p-2 border rounded"
/>
       
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label className="block text-gray-700">Bio</label>
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          maxLength="150"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>

     

      {/* Gender Selection */}
      <div className="mb-4">
        <label className="block text-gray-700">Gender</label>
        <select
          className="w-full p-2 border rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option>Female</option>
          <option>Male</option>
          <option>Other</option>
        </select>
      </div>

      {/* Show Account Suggestions */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700">Show account suggestions on profiles</span>
        <input
          type="checkbox"
          className="toggle"
          checked={showSuggestions}
          onChange={() => setShowSuggestions(!showSuggestions)}
        />
      </div>

      {/* Submit Button */}
      <button   onClick={() => handleUpdateUser(id)}
        className={`w-full py-2 rounded ${bio ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        disabled={!bio}
      >
        Submit
      </button>
    </div>
 
  );
}
