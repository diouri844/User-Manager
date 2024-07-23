  import { VStack,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Button,
    Flex,
    Avatar,
    Text,
    Box,
    Heading,
    IconButton,
    HStack
  } from '@chakra-ui/react';

  import {
          BsThreeDotsVertical
        } from 'react-icons/bs';
  import {
    BiLike ,
    BiBookBookmark,
    BiShare
  } from 'react-icons/bi';

  import React from 'react'
  import { Giga } from '../';

function feedList({isAdmin}) {
  console.log( "is admin state : "
   + isAdmin
  );
  {/* fetch for all the feeds :
    feeds is :
      - operatiosn by users
      - gigs by users
      - admin actions if the conected user is a admin membre
      overflowY="scroll"
      height={}
      css={{
      '&::-webkit-scrollbar': {
        width: '8px'
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#e5e5e5',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#e5e5e5',
      },
    }}
    */}
  return (
    <VStack
    ml={-100}
    spacing={8}
    position="absolute"
    mt={0}
    mx={100}
    >
      {/* feed item exemple base */}
      <Giga
        authorName="Segun Adebayo"
        gigaArea="Creator, Chakra UI"
        gigaDescription="With Chakra UI, I wanted to sync the speed of development with the speed
        of design. I wanted the developer to be just as excited as the designer to
        create a screen."
        HaseImage={false}
        imageUrl="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        likes={4}
        shares={0}
        saved={false}
      />
      {/** add a seconde giga  */}
      <Giga
        authorName="Salah Iddine Diouri"
        gigaArea="FullStack Developer, Python"
        gigaDescription="Hi my name is salah I am a full stack web developer with more than 3 years of pro experiences in creating API,
        servers and client side application, I have a large skills with full stack Javascript and typescript development
        also I am a python expert with more than 5 years of using it in different areas of
        development, automation and data management,
        I would be happy to help your company to create a solution
        "
        HaseImage={true}
        imageUrl="https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        likes={15}
        shares={100}
        saved={false}
      />
      {/** Add the last giga item  */}
      <Giga
        authorName="John Doe"
        gigaArea="Software Engineer"
        gigaDescription="I believe in building scalable and efficient software solutions that solve real-world problems.
          My passion lies in creating elegant code and optimizing performance."
        HaseImage={true}
        imageUrl="https://images.unsplash.com/photo-1688853206609-da4e92648b84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        likes={250}
        shares={1000}
        saved={true}
      />
      <Giga
        authorName="Emily Thompson"
        gigaArea="Cycling Enthusiast"
        gigaDescription="I'm passionate about bikes and the freedom they bring.
          Whether it's a thrilling mountain bike trail or a leisurely ride through the city,
          cycling is my escape and source of joy."
        HaseImage={true}
        imageUrl="https://images.unsplash.com/photo-1605915034248-ba76b2f32c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJpa2Vyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        likes={22000}
        shares={18000}
        saved={false}
      />
    </VStack>
  )
}

export default feedList
