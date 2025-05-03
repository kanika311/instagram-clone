import axios from "axios"



class AuthApi  {

  async register(data){
    console.log(process.env.NEXT_PUBLIC_HOST, "API base URL");

    try {
      
        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/auth/register`, data);
        if(response.data.status === 'SUCCESS'){
           return response.data
        }else{
            return false
        }
    } catch (error) {
        console.log(error,'error in register api')
    }
  }

  async Login(data){
    console.log(process.env.NEXT_PUBLIC_HOST, "API base URL");

    try {
      
        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/auth/login`, data);
        if(response.data.status === 'SUCCESS'){
           return response.data
        }else{
            return false
        }
    } catch (error) {
        console.log(error,'error in register api')
    }
  }
// reset password
async resetPassword(data){
  try {
      
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/auth/reset-password-otp`, data);
    if(response.data.status === 'SUCCESS'){
       return response.data
    }else{
        return false
    }
} catch (error) {
    console.log(error,'error in reset password api')
}
}
// newpassword
async newPassword(data){
  try {
      
    const response = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/auth/reset-password`, data);
    if(response.data.status === 'SUCCESS'){
       return response.data
    }else{
        return false
    }
} catch (error) {
    console.log(error,'error in change password api')
}
}
// user
async getUser() {
  try {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/user/me`, {
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    },
    });

    if (response.data.status === 'SUCCESS') {
      console.log("Fetched user:", response.data.data); // 👈 Verify correct user
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error, "error in users api");
  }
}


// upload image api
async uploadUser(id,formData){
  try {
    const result =await axios.put(`${process.env.NEXT_PUBLIC_HOST}/user/upload/${id}`,formData,
      { headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type":"multipart/form-data"
       },
     }
     );
     if (result){
      return result
     }
     else{
      return false
     }
    
  } catch (error) {
    console.log(error,"error in upload api")
  }
}

// update
async updateUser(id,data){
 
    try {
      const response =await axios.put(`${process.env.NEXT_PUBLIC_HOST}/user/update/${id}`,data,
        { headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`
          
         },
       }
       );
       if(response.data.status==='SUCCESS')
        {
  return response.data
        }
       else{
        return false
       }
    
  } catch (error) {
    console.log(error,"error in update api")
    
  }
  }
  // user list 
  async userList(){
    try {
      let obj=
      {
        "query":{},
        "options": {
          "collation": "",
          "sort": {"name":1},
          "populate": "",
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
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/user/list`,obj,
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
  // get user by id
  async getUserById(id){
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/user/get/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response,"response of get user by id api")
      if(response.data.status==='SUCCESS'){
        return response.data
      }
      else{
        return false
      }
    } catch (error) {
      console.log(error,"error in get user by id api")
    }
  } 
}
const authApi = new AuthApi();

export default authApi;