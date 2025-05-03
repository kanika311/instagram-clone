import { useSocket } from "@/Content/socketContext";
import { chatSingleUser, SearchUser } from "@/redux/slices/message";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import ChatBox from "./Chatbox";
import Messages from "./Message";
import { useRouter } from "next/navigation";



export default function NewMessageSearch({ onClose, onStartChat }) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
 const searchResults = useSelector(state => state.message.search);
  const following=useSelector((state)=>state.follow.following||[]);
  const dispatch=useDispatch();
  console.log(searchResults,"search results")
  
//   // chat single user
// const handleMessages=async()=>{
//   try {
//     const result=await (dispatch(chatSingleUser(chatUser?.chatId)))

//     if(result){
      
//       console.log(result,"result of chat single user")
     
//     }
//     return false;
//   } catch (error) {
//     console.log(error,"error in chat single user")
//   }
// }
// useEffect(()=>{
//   handleMessages();
// },[chatUser])
// console.log(chatmessage,"result of chat")



// search user
const handleSearchUser=async()=>{
  if (!search.trim()) return;
  try {
   const searchData = {"searchKey": search}
    const result = await dispatch(SearchUser(searchData));
    if(result){
      console.log(result,"result of search user")
      return result;
    }
   
  } catch (error) {
    console.log(error,"error in search user")
  }
}






  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[500px] max-h-[600px] shadow-xl">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">New message</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black "><RxCross2 size={25}/></button>
        </div>

        <div className="border-b px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearchUser();
            }}
            
            className="w-full border-none outline-none bg-transparent"
          />
        </div>
           {/* Search results */}
    <div className="px-4 py-2">
      {searchResults?.result && searchResults.result.length > 0 ? (
        searchResults.result.map(user => (
          <div 
            key={user._id} 
            className="py-2 border-b hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src={user?.picture || "/photos/avatar.jpg"} 
                  alt={user?.name} 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{user?.username}</div>
                  {user?.name && <div className="text-sm text-gray-500">{user?.name}</div>}
                </div>
              </div>
              <input
                type="radio"
                checked={selectedUser?._id === user._id}
                readOnly
                className="ml-2"
              />
            </div>
          </div>
        ))
      ) : search ? (
        <div className="text-gray-500 py-2 text-center">No user found</div>
      ) : null}
    </div>
  
{/* suggested users */}

        <div className="px-4 py-2 max-h-[300px] overflow-y-scroll">
          <p className="text-sm text-gray-500 mb-2">Suggested</p>
          {following[0]?.data?.data?.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-gray-100 px-2 py-2 rounded-md cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={user?.picture||"/photos/avatar.jpg"}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{user?.username}</span>
              </div>
              <input
                type="radio"
                checked={selectedUser?._id === user?._id}
                readOnly
              />
            
            </div>
          ))}
        </div>

        <div className="p-4">
          <button
            onClick={() => {
              if (selectedUser) {
                onStartChat(selectedUser);
                onClose();
              }
            }}
            className={`w-full py-2 rounded-lg font-semibold ${
              selectedUser
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-100 text-blue-300 cursor-not-allowed"
            }`}
            >
              Send
              
            </button>
        </div>
    
      </div>
    </div>
  );
}
