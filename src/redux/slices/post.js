
import postApi from "@/mocks/post";
import { createSlice} from "@reduxjs/toolkit";
import authSlice from './auth'


const initialState = {
    post:{},
    postList:[],
    Comments:[],
    loading:false,
}


const slice = createSlice({
    name:"post",
    initialState,
    reducers:{
        createpost(state, action) {
            const user = action.payload.data; // the full user object
            const newPost = user.post?.[user.post.length - 1]; // get the last/newly added post
          
            if (newPost) {
              state.post = newPost;
              state.postList = [newPost, ...state.postList];
            }
          },
          
        postlist(state,action){
            let data = [...action.payload.data.data]
            console.log(data)
         state.postList = data
        },
        postlike(state, action) {
            const updated = action.payload.data;
            const newPostData = updated.post;
            state.postList = state.postList.map(post =>
              post._id === newPostData._id ? { ...post, ...newPostData } : post
            );
          },
          
        postdelete(state,action){
            let id = action.payload.data
            console.log(id,'id')
           state.postList = state.postList.filter((item) => item.id !== id)
          
        },
        postcomment(state, action) {
            const newComment = action.payload.data;
            state.postList = state.postList.map(post => {
              if (post.id === newComment.postId) {
                return {
                  ...post,
                  comments: [...(post.comments || []), newComment],
                };
              }
              return post;
            });
          },
          commentlist(state,action){
            let data = [...action.payload.data]
           
         state.Comments = data
        },
          deletecomment(state, action) {
            const commentId = action.payload;
          
            state.postList = state.postList.map(post => {
              const updatedComments = post.comments?.filter(comment => comment.id !== commentId);
              return { ...post, comments: updatedComments };
            });
          },
          
          commentreply(state, action) {
            const { postId, commentId, reply } = action.payload;
          
            state.postList = state.postList.map(post => {
              if (post.id === postId) {
                return {
                  ...post,
                  comments: post.comments.map(comment => {
                    if (comment.id === commentId) {
                      return {
                        ...comment,
                        replies: [...(comment.replies || []), reply]
                      };
                    }
                    return comment;
                  })
                };
              }
              return post;
            });
          }
          
      
       

    }

});

export const {reducer} = slice

export const CreatePost = (data) => async (dispatch) => {
    try {
      const result = await postApi.createPost(data);
      if (result) {
        await dispatch(slice.actions.createpost(result));
  
        // 👇 Dispatch to auth slice to update user.post
        const newPost = result?.data?.post?.[result?.data?.post.length - 1];
        if (newPost) {
          await dispatch(authSlice.actions.updateUserPost(newPost));
        }
  
        return result;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };
  
export const ShowPost = () => async (dispatch) =>{

    try {
        
        const result = await postApi.PostList();
        if(result){
            await dispatch(slice.actions.postlist(result))
            return result
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
// like api
export const PostLike = (id) => async (dispatch) => {
  try {
    const result = await postApi.postLike(id); // ✅ Makes API call

    if (result) {
      await dispatch(slice.actions.postlike(result)); // ✅ Sends result to reducer
      return result; // ✅ return the result
    }

    return false; // ❗ Return something in failure case
  } catch (error) {
    console.log("Like error", error);
    return false; // ❗ Ensure it returns something even on error
  }
};

  
// delete post
export const DeletePost = (id) => async (dispatch) =>{

    try {
        
        const result = await postApi.DeletePost(id);
        if(result){
            await dispatch(slice.actions.postdelete(id))
            await dispatch(authSlice.actions.deleteUserPost(id)); 

            return result
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
// comment post
export const postComment  = (data) => async (dispatch) =>{

    try {
        
        const result = await postApi.postComment(data);
        if(result){
            await dispatch(slice.actions.postcomment(result))
            return result
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
// get Comment
export const getComment  = (id) => async (dispatch) =>{

    try {
        
        const result = await postApi.getComment(id);
        if(result){
            await dispatch(slice.actions.commentlist(result))
       return result
           
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
// delete comment
export const DeleteComment  = (id) => async (dispatch) =>{

    try {
        
        const result = await postApi.CommentDelete(id);
        if(result){
            await dispatch(slice.actions.deletecomment(id))
            return result
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
// comment reply
export const CommentReply  = (data) => async (dispatch) =>{

    try {
        
        const result = await postApi.CommentReply(data);
        if(result){
            await dispatch(slice.actions.commentreply(id))
            return result
        }
        return false
    } catch (error) {
        console.log(error)
    }
}


export default slice;