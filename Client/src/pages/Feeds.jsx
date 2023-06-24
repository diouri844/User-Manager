import React from 'react'
import { Feeds as FeedList, SimpleSidebar } from '../components'
import { Container } from '@chakra-ui/react'

function Feeds() {
  return (
    <Container maxW="5xl"
    py={{ base: '12', md: '24' }} 
    px={{ base: '0', sm: '8' }}
    >
        <SimpleSidebar />
        Feeds page :
        <FeedList />
    </Container>
  )
}

export default Feeds