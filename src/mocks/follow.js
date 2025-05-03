import axios from "axios"



class FollowApi  {

// follow
 
  async followFriend(data){
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/friendship/follow`,data,
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
// gt=et followers
async followersList(){
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/friendship/followers`,
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
// following api
async followingList(){
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/friendship/following`,
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
// unfollow user
async unfollowUser(data){
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/friendship/unfollow`,data,
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
// Remove followers
async RemoveUser(data){
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/friendship/remove`,data,
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
}
const followApi = new FollowApi();

export default followApi;