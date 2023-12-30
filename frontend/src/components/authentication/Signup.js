import React from "react";
import { Button } from "@chakra-ui/button"
import {  VStack } from '@chakra-ui/react';
import {  Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {

  const [show, setShow] = React.useState(false)
  const [name, setName] = React.useState()
  const [email, setEmail] = React.useState()
  const [confirmPassword, setConfirmPassword] = React.useState()
  const [password, setPassword] = React.useState()
  const [pic, setPic] = React.useState()
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();

    const navigate = useNavigate();

 const baseURI = 'http://localhost:8000';

 const handleClick = () => {
   setShow(!show)
 }

 const PostDetails = (pics) => {
 	 setLoading(true);
 	 if (pics === undefined) {
          toast({
               title:"Please Select an Image!",
               status:"warning",
               duration: 5000,
               isClosable:true,
               position: "top"
          })
          return;
 	 }

 	 if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
                 const data = new FormData();
                 data.append("file",pics);
                 data.append("upload_preset","chat-mern-app");
                 data.append("cloud_name","dnhmadsjz");
                 fetch("https://api.cloudinary.com/v1_1/dnhmadsjz",{
                      method:"post",body: data
                 }).then((res) => res.json())
                 .then(data => {
                       setPic(data.url.toString());
                       console.log(data.url.toString());
                       setLoading(false);
                 })
                 .catch((error) => {
                        console.log("Error while cloudinary uploading",error)
                        setLoading(false);
                 });

 	 } else {
              toast({
               title:"Please Select an Image!",
               status:"error",
               duration: 5000,
               isClosable:true,
               position: "top"
          });
          setLoading(false);
          return;
 	 }
 }

 const submitHandler = async() => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
            toast({
               title:"Please fill all the feild",
               status:"warning",
               duration: 5000,
               isClosable:true,
               position: "top"
            });
            setLoading(false)
            return;
    }
    if (password !== confirmPassword) {
         toast({
               title:"Passwod did not match",
               status:"warning",
               duration: 5000,
               isClosable:true,
               position: "top"
            });
            return;
    }

   try {

       const config = {
            headers: {
                "Content-type":"application/json",
            },
        };

   const { data } = await axios.post(`${baseURI}/api/user`,{
          name, email, password, pic}, config
   );

          toast({
               title:"Registration Successfull",
               status:"success",
               duration: 5000,
               isClosable:true,
               position: "top",
            });

  localStorage.setItem('userInfo',JSON.stringify(data));

  setLoading(false);

      navigate("/chats")

   } catch(error) {
           console.log("Error:",error);
             toast({
               title:"Error occured on signup page",
               description:error.response.data.message,
               status:"error",
               duration: 5000,
               isClosable:true,
               position: "top"
            });
            setLoading(false);
   }


 };

 return(

  <>
   <VStack spacing='5px' >
     <FormControl id='first-name' isRequired>
       <FormLabel>Name</FormLabel>
       <Input
          placeholder='Enter your Name'
          onChange={(e)=> setName(e.target.value)}
       />
      </FormControl>
      <FormControl id='email' isRequired>
       <FormLabel>Email</FormLabel>
       <Input
          placeholder='Enter your Email'
          onChange={(e)=> setEmail(e.target.value)}
       />
      </FormControl>

      <FormControl id='password' isRequired>
       <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
          type={show ? 'text' : "password"}
          placeholder='Enter your Password'
          onChange={(e)=> setPassword(e.target.value)}
          />
          <InputRightElement  width='4.5rem'>
           <Button h='1.75rem' size='sm' onClick={handleClick}>
             {show ? "Hide" : "show"}
           </Button>
          </InputRightElement>
         </InputGroup>
      </FormControl>

      <FormControl id='password' isRequired>
       <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
          type={show ? 'text' : "password"}
          placeholder='Confirm Password'
          onChange={(e)=> setConfirmPassword(e.target.value)}
          />
          <InputRightElement  width='4.5rem'>
           <Button h='1.75rem' size='sm' onClick={handleClick}>
             {show ? "Hide" : "show"}
           </Button>
          </InputRightElement>
         </InputGroup>
      </FormControl>

      <FormControl id='pic' >
       <FormLabel>Upload a Picture</FormLabel>
       <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e)=> PostDetails(e.target.files[0])}
       />
      </FormControl>

  <Button
 colorScheme="blue"
 width="100%"
 style={{ marginTop: 15 }}
 onClick={submitHandler}
 isLoading={loading}
  >
    Sign Up
  </Button>

   </VStack>
  </>

 )
}

export default Signup