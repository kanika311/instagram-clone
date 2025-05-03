
import authApi from "@/mocks/auth";
import { Slice,createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:{},
    userbyid:{},
   
    userlist:[],
    loading:false,
}


const authSlice  =   createSlice({
    name:"auth",
    initialState,
    reducers:{
        updateUserPost(state, action) {
            console.log("Before update:", state.user);
            const newPost = action.payload;
            if (state.user && Array.isArray(state.user.post)) {
              state.user.post = [newPost, ...state.user.post];
            } else {
              state.user.post = [newPost];
            }
            console.log("After update:", state.user.post);
          },
          
        startLoading(state) {
            state.loading = true;
          },
          stopLoading(state) {
            state.loading = false;
          },

        getUser(state,action){
            let data = {...action.payload.data}
            console.log(data)
         state.user = data
        },
        deleteUserPost(state, action) {
            const postId = action.payload;
            state.user.post = state.user.post?.filter(post => post._id !== postId);
          },
          
        userlist(state, action) {
            const data = action.payload.data; // ✅ already an array
            console.log(data, "userlist");
            state.userlist = data;            // ✅ no extra wrapping
          },
        uploaduser(state,action){
            let data={...action.payload.data}
            console.log(data)
            state.user=data
        },
        updateuser(state,action){
            let data={...action.payload.data}
            console.log(data)
            state.user=data
        },
        getuserbyid(state,action){
            let data={...action.payload.data}
            console.log(data)
            state.userbyid=data
        }
      
       

    }

});

export const {reducer} = authSlice

export const getUser = () => async (dispatch) => {
    try {
      dispatch(authSlice.actions.startLoading());
      const result = await authApi.getUser();
      
      if (result) {
        
        dispatch(authSlice.actions.getUser(result));
     
        return result
      }
      dispatch(authSlice.actions.stopLoading());
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

// upload users image

export const uploadUser=(id,formData)=>async(dispatch)=>{
    try {
        const result=await authApi.uploadUser(id,formData);
     
        if(result){
            await dispatch(authSlice.actions.uploaduser(result))
            return result
        }
        return false
        
    } catch (error) {
        console.log(error) 
    }
}


// Update users



export const updateUser=(id,data)=>async(dispatch)=>{
    try {
        const result=await authApi.updateUser(id,data);
      
        if(result){
            await dispatch(authSlice.actions.updateuser(result))
            return result
        }
        return false
        
    } catch (error) {
        console.log(error) 
    }
}
// get users
export const getUserList=()=>async(dispatch)=>{
    try {
        const result=await authApi.userList();
        console.log(result,'result in authSlices')
        if(result){
            await dispatch(authSlice.actions.userlist(result))
          return result;
        }
        return false
        
    } catch (error) {
        console.log(error) 
    }
}
// get user by id
export const getUserById=(id)=>async(dispatch)=>{
    try {
        const result=await authApi.getUserById(id);
        if(result){
          await dispatch(authSlice.actions.getuserbyid(result))
            return result
        }
        return false
    } catch (error) {
        console.log(error,"error in get user by id")
    }
} 




export default authSlice;