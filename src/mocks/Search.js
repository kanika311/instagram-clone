import axios from "axios"



class searchApi  {

// search user

  async searchUser(data){
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/search/getUser`,data,
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
const SearchApi = new searchApi();

export default SearchApi;