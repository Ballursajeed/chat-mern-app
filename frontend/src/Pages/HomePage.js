import React from "react"
import { Container, Box, Text,Tab, Tabs,TabList, TabPanels, TabPanel } from "@chakra-ui/react"
import Login from "../components/authentication/Login"
import Signup from "../components/authentication/Signup"

const HomePage = () => {
 return(
<>
<Container maxW='x1' centerContent>
 <Box
 display='flex'
 justifyContent='center'
 p={3}
 bg={"white"}
 w="50%"
 m="40px 0 15px 0"
 marginTop="70px"
 borderRadius="lg"
 borderWidth="1px"
 >
  <Text fontSize="4xl" color='black'>Chat-App</Text>
 </Box>
 <Box
    bg="white" w="50%" p={4} borderRadius="lg" color='black' borderWidth="1px"
 >
  <Tabs variant='soft-rounded' >
  <TabList mb='1em'>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Signup />
    </TabPanel>
  </TabPanels>
</Tabs>
 </Box>
</Container>
</>
 )
}
export default HomePage;