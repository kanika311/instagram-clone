import axios from "axios"



class PostApi  {

// create post

  async createPost(data){
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/post/create`,data,
       { headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        
        },
      }
      );
      if(response)
      {
return response
      }
      else{
        return false;
      }

      
    } catch (error) {
      console.log(error,"error in users api")
    }
}
// delete post 
async DeletePost(id){
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/post/delete/${id}`,
     { headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      
      },
    }
    );
    if(response)
    {
return response
    }
    else{
      return false;
    }

    
  } catch (error) {
    console.log(error,"error in users api")
  }
}
// list post
async PostList(){
  try {
    let obj=
      {
        "query":{},
        "options": {
          "collation": "",
          "sort": {"name":1},
          populate: [
            { path: 'userId' },
            { path: 'comments' }
          ],
          "projection": "",
          "lean": false,
          "leanWithId": true,
          "page": 1,
          "limit": 15,
          "pagination": true,
          "useEstimatedCount": false,
          "useCustomCountFn": false,
          "forceCountFn": false,
          "read": {},
          "options": {}
        },
        "isCountOnly": false
      }
    
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/post/list`,obj,
     { headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      
      },
    }
    );
    if(response.data.status==='SUCCESS')
      {
return response.data
      }
    else{
      return false;
    }

    
  } catch (error) {
    console.log(error,"error in list api")
  }
}

// post like
async postLike(id) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/post/like`,
      { postId: id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Log the full response for debugging
    console.log("Like API response: ", result);
    if (result.status === 200) {
      return result.data; // ✅ This is good
    } else {
      return false; // ✅ Return something meaningful
    }
  
  } catch (error) {
    console.log("Error in like API", error);
    return false;
  }
}

// post commwnt
async postComment(data){
  try {
    const result=await axios.post(`${process.env.NEXT_PUBLIC_HOST}/post/comment` ,data,
      { headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" 
      
      },
    }
    );
    if(result){
      return result
    }
    else {
      return  false
    }
    
  } catch (error) 
  {
    console.log(error,"error in like api")
    
  }
  
}

// get all comment 
async getComment(id){
 
  try {
    const obj={
      "query":{},
      "options": {
        "collation": "",
        "sort": {"name":1},
        "populate": "userId",
        "projection": "",
        "lean": false,
        "leanWithId": true,
        "page": 1,
        "limit": 10,
        "pagination": true,
        "useEstimatedCount": false,
        "useCustomCountFn": false,
        "forceCountFn": false,
        "read": {},
        "options": {}
      },
      "isCountOnly": false
    }
    const result=await axios.post(`${process.env.NEXT_PUBLIC_HOST}/post/commentlist/${id}`  ,obj,
      { headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    
      }
    }
    );
    if(result.data.status==="SUCCESS"){
  
      return result.data.data
      
    }
    else {
      return  false
    }
    
  } catch (error) 
  {
    console.log(error,"error in like api")
    
  }
}
// delete comment
async CommentDelete(id){
  try {
    const result=await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/post/deleteComment/${id}`  ,
      { headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" 
      
      },
    }
    );
    if(result){
      return result
    }
    else {
      return  false
    }
    
  } catch (error) 
  {
    console.log(error,"error in like api")
    
  }
  
}
// comment reply
async CommentReply(data){
  try {
    const result=await axios.post(`${process.env.NEXT_PUBLIC_HOST}/post/commentreply` ,data,
      { headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" 
      
      },
    }
    );
    if(result){
      return result
    }
    else {
      return  false
    }
    
  } catch (error) 
  {
    console.log(error,"error in reply api")
    
  }
  
}
}
const postApi = new PostApi();

export default postApi;