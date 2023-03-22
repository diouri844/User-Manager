import { Center, Heading } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <div className="App"> 
        <Center bg='white' h='80px' color='black' variant="solid" mb={1}>
          <Outlet /> 
        </Center>
    </div>
  )
}

export default App
