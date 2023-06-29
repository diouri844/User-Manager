import React from 'react'

import { SimpleSidebar } from '../components'


import { Container } from '@chakra-ui/react'


function profileLayout({ children }) {
  return (
    <Container maxW="5xl" 
         py={{ base: '12', md: '24' }} 
         px={{ base: '0', sm: '8' }}> 
    <SimpleSidebar />
        { children }
    </Container>
  )
}

export default profileLayout