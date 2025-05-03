import axios from "axios"



class MessageApi  {

// users message list
async messageList(){
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/message/chatlist`, {
      query: {},
      options: {
        collation: "",
        sort: { name: 1 },
        populate: "",
        projection: "",
        lean: false,
        leanWithId: true,
        page: 1,
        limit: 10,
        pagination: true,
        useEstimatedCount: false,
        useCustomCountFn: false,
        forceCountFn: false,
        read: {},
        options: {}
      },
      isCountOnly: false
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
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
// chat single user
async chatSingleUser(chatId){
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/message/get/${chatId}`,
   {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      } 
    });
    console.log(response,"chat in mockssdcfv")
    if(response.data.status==='SUCCESS')
    {
      console.log(response,"chat in mocks")
      return response.data
    }
    else{
      return false;
    }
  } catch (error) {
    console.log(error,"error in chat single user")
  }
}



}
const messageApi = new MessageApi();

export default messageApi;