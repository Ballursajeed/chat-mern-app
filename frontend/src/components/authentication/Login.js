import React from "react";
import { Button } from "@chakra-ui/button"
import {  VStack } from '@chakra-ui/react';
import {  Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { FormControl, FormLabel } from "@chakra-ui/form-control";

const Login = () => {

   const [show, setShow] = React.useState(false)
  const [email, setEmail] = React.useState()
  const [password, setPassword] = React.useState()

 const handleClick = () => {
   setShow(!show)
 }


 const submitHandler = () => {

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