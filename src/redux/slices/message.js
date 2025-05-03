import messageApi from "@/mocks/message";
import SearchApi from "@/mocks/Search";
import {Slice, createSlice} from "@reduxjs/toolkit";

const initialState = {
 message:[],
 chat:[],
 search:[],
   
    loading:false,
}


const messageSlice = createSlice({
    name:"message",
    initialState,
    reducers:{
        message(state,action){
            let data = {...action.payload.data}
            console.log(data)
         state.message = data
        },
        messageChat(state,action){
          console.log('hello slices')
            let data = {...action.payload.data}
            console.log(data,"data of message")
            state.chat=data
        },
        setSearchResults(state, action) {
            state.search = action.payload;
            console.log(state.search,"search of message")
        }
    },
  
       
});

export const {reducer} = messageSlice



// followers list
export const messageList=()=> async (dispatch) => {
  try {
  
    const result = await messageApi.messageList();
    if (result) {
      dispatch(messageSlice.actions.message(result));
      return result;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const chatSingleUser=(chatId)=>async(dispatch)=>{
    try {
      const result=await messageApi.chatSingleUser(chatId)
      if(result){
        console.log(result,'res of chat in slices')
 
        dispatch(messageSlice.actions.messageChat(result))
      }
      console.log(result,'res of chatb in slices')
      return result;
    } catch (error) {
      console.log(error,"error in chat single user")
    }
  }
  // Search user
  export const SearchUser = (searchData) => async (dispatch) => {
    try {
          const result = await SearchApi.searchUser(searchData);
      if (result && result.data) {
        dispatch(messageSlice.actions.setSearchResults(result.data.data));
        return result;
      }
     
    } catch (error) {
      console.error("Error in SearchUser:", error);
      return false;
    }
  } 






export default messageSlice;