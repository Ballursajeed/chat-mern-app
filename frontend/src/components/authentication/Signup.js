import React from "react";
import { Button } from "@chakra-ui/button"
import {  VStack } from '@chakra-ui/react';
import {  Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { FormControl, FormLabel } from "@chakra-ui/form-control";

const Signup = () => {

  const [show, setShow] = React.useState(false)
  const [name, setName] = React.useState()
  const [email, setEmail] = React.useState()
  const [confirmPassword, setConfirmPassword] = React.useState()
  const [password, setPassword] = React.useState()
  const [pic, setPic] = React.useState()


 const handleClick = () => {
   setShow(!show)
 }

 const PostDetails = (pics) => {
 }

 const submitHandler = () => {

 }

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
  >
    Sign Up
  </Button>

   </VStack>
  </>

 )
}

export default Signup