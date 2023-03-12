import { useState } from 'react'
import { Center, Heading, Circle } from '@chakra-ui/react'
import Login from './pages/Login'
function App() {

  return (
    <div className="App">
      <Center bg='white' h='80px' color='black' variant="solid" mb={1}>
        <Heading size={{ base: 'lg', md: 'xl' }}>User Manager </Heading> 
      </Center>
      <Login />
    </div>
  )
}

export default App
