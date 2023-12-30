import React from "react";
import { Button } from "@chakra-ui/button"
import {  VStack } from '@chakra-ui/react';
import {  Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {

   const [show, setShow] = React.useState(false)
  const [email, setEmail] = React.useState()
  const [password, setPassword] = React.useState()
   const [loading, setLoading] = React.useState(false);

    const toast = useToast();

     const baseURI = 'http://localhost:8000';

       const navigate = useNavigate();


 const handleClick = () => {
   setShow(!show)
 }


 const submitHandler = async() => {
      setLoading(true);
    if ( !email || !password ) {
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
   /* if (password !== confirmPassword) {
         toast({
               title:"Passwod did not match",
               status:"warning",
               duration: 5000,
               isClosable:true,
               position: "top"
            });
            return;
    }*/

   try {

       const config = {
            headers: {
                "Content-type":"application/json",
            },
        };

   const { data } = await axios.post(`${baseURI}/api/user/login`,{
        email, password}, config
   );

          toast({
               title:"Logged in  Successfull",
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
 }


 return(


  <>
   <VStack spacing='5px' >
      <FormControl id='email' isRequired>
       <FormLabel>Email</FormLabel>
       <Input
          placeholder='Enter your Email'
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
       />
      </FormControl>

      <FormControl id='password' isRequired>
       <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
          type={show ? 'text' : "password"}
          placeholder='Enter your Password'
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
          />
          <InputRightElement  width='4.5rem'>
           <Button h='1.75rem' size='sm' onClick={handleClick}>
             {show ? "Hide" : "show"}
           </Button>
          </InputRightElement>
         </InputGroup>
      </FormControl>

  <Button
 colorScheme="blue"
 width="100%"
 style={{ marginTop: 15 }}
 onClick={submitHandler}
 isLoading={loading}
  >
    Log In
  </Button>

<Button
 variant="solid"
 colorScheme="red"
 width="100%"
 onClick={() => {
   setEmail('guest@example.com')
   setPassword("12345")
 }}
  >
    Get Guest User Creadentials
  </Button>

   </VStack>
  </>

 )
}

export default Login