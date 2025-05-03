

import followApi from "@/mocks/follow";
import {Slice, createSlice} from "@reduxjs/toolkit";

const initialState = {
   follow:{},
   followers:[],
   following:[],
    loading:false,
}


const slice = createSlice({
    name:"follow",
    initialState,
    reducers:{
        followuser(state,action){
            let data = {...action.payload.data}
            console.log(data)
         state.follow = data
        },
        followers(state,action){
          let data=[action.payload.data]
          console.log(data)
          state.followers=data
        },
        following(state,action){
          let data=[action.payload.data]
          console.log(data)
          state.following=data
        },
        unfollow(state, action) {
       
          const unfollowedId = action.payload.friendId;  
        
         
          if (state.following[0]?.data?.data) {
            state.following[0].data.data = state.following[0].data.data.filter(
              (user) => user._id !== unfollowedId
            );
          }
        },
        
        
        Removefollowers(state, action) {
          // filter out the removed follower manually
          const removedId = action.payload.followerId
          if (state.followers[0]?.data) {
            state.followers[0].data = state.followers[0].data.filter(f => f._id !== removedId);
          }
        }
        
      
       

    }

});

export const {reducer} = slice

export const followUser=(data)=> async (dispatch) => {
    try {
    
      const result = await followApi.followFriend(data);
      if (result) {
        dispatch(slice.actions.followuser(result));
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

// followers list
export const followersList=()=> async (dispatch) => {
  try {
  
    const result = await followApi.followersList();
    if (result) {
      dispatch(slice.actions.followers(result));
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
// following list
export const followingList=()=> async (dispatch) => {
  try {
  
    const result = await followApi.followingList();
    if (result) {
      dispatch(slice.actions.following(result));
      return result;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
// unfollow
export const unfollowUser=(data)=> async (dispatch) => {
  try {
  
    const result = await followApi.unfollowUser(data);
    if (result) {
      dispatch(slice.actions.unfollow(data));
      return result;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Remove followers
export const RemoveUser=(data)=> async (dispatch) => {
  try {
  
    const result = await followApi.RemoveUser(data);
    if (result) {
      dispatch(slice.actions.Removefollowers(data));
      return result;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};





export default slice;