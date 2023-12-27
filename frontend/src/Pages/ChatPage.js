import React from "react"
import axios from "axios"
import { baseURI } from "../baseUrl.js"

const ChatPage = () => {

 const [chats, setChats] = React.useState([]);

const fetchChats = async() => {
 	const { data }  = await axios.get(`${baseURI}/api/chat`)
	console.log(data);
	setChats(data);
}


 React.useEffect(() => {
  fetchChats()
 },[])


 return(
<>
  <h1>Chat Page</h1>
</>
 )
}
export default ChatPage;