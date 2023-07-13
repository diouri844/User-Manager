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
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
  } from '@chakra-ui/react';

  import {  
    BsThreeDotsVertical
  } from 'react-icons/bs';
    import {
        BiLike, 
        BiSolidLike,
        BiBookBookmark, 
        BiShare,
        BiSolidShare,
        BiSave,
        BiDislike,
        BiPlusCircle,
        BiUserPlus,
        BiBlock
    } from 'react-icons/bi';

import React, { useState } from 'react'
import { FiEyeOff } from 'react-icons/fi';


function giga({ 
    authorName,
    gigaArea,
    gigaDescription,
    HaseImage,
    imageUrl,
    likes,
    shares,
    saved
}) {
    // create states for likes , saved and shares : 
    const [isLiked,setIsLiked] = useState(likes);
    const [isSaved,setIsSaved] = useState(saved);
    const [isSahred, setIsShared] = useState(shares);
    return (
    <Card maxW='xl'
      bgColor={'gray.50'}
      shadow={'md'}
      rounded={15}
      width={400}
      variant="elevated"
      mx={17}
      >
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar 
              bgColor={"gray.900"}
              color={'white'}
              name={authorName} 
               />
              <Box>
                <Heading size='sm'>{authorName}</Heading>
                <Text 
                fontFamily={"mono"}
                >{gigaArea}</Text>
              </Box>
            </Flex>
            <Menu>
                <MenuButton 
                    as={IconButton} 
                    icon={<BsThreeDotsVertical />}
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='See menu'  
                />
                <MenuList
                fontSize={"16px"}
                alignContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                bgColor={'gray.100'}
                >
                    <MenuItem
                    bgColor={'gray.100'}
                    textColor={'gray.700'}
                    icon={<BiDislike />}
                    >Report 
                    </MenuItem>
                    <MenuItem
                    bgColor={'gray.100'}
                    textColor={'gray.700'}
                    icon={<BiUserPlus/>}
                    >
                    Follow
                    </MenuItem>
                    <MenuItem
                    bgColor={'gray.100'}
                    textColor={'gray.700'}
                    icon={<BiBlock />}
                    >
                    Block
                    </MenuItem>
                    <MenuItem
                    bgColor={'gray.100'}
                    textColor={'gray.700'}
                    icon={<FiEyeOff />}
                    >
                    Hide
                    </MenuItem>
                </MenuList>
            </Menu>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text 
            fontFamily={"monospace"}
            fontSize={"15px"}
          >
            { gigaDescription }
          </Text>
        </CardBody>
        {
            HaseImage &&
            <Image
            objectFit='cover'
            rounded={5}
            px={1}
            src={ imageUrl }
            alt={ gigaArea }
        />
        }
        <CardFooter
          justify='space-between'
          flex="row"
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <HStack spacing={15}>
            <Button flex='1' 
              variant='ghost' 
              leftIcon={
                isLiked === likes ? <BiLike /> : <BiSolidLike />
                }
              onClick={()=> {
                if ( isLiked != likes ){
                    setIsLiked(isLiked-1);
                    
                    return;
                }
                setIsLiked(isLiked+1);
              }}
              >
              { isLiked }
            </Button>
            <Button flex='1' 
                variant='ghost' 
                onClick={
                    ()=> {
                        setIsSaved(!isSaved);
                    }
                }
                leftIcon={
                isSaved ?
                <BiBookBookmark /> : <BiSave /> 
                }>
                {isSaved ?  'Saved' : 'Save it' }
            </Button> 
            <Button flex='1' 
            mr={0}
            variant='ghost'
            onClick={
                ()=> {
                    if ( isSahred != shares ){
                        setIsShared(isSahred-1);   
                        return;         
                    }
                    setIsShared(isSahred+1);
                }
            } 
            leftIcon={
            isSahred === shares ?
                <BiShare /> : <BiSolidShare />
            }>
              { isSahred }
            </Button>
          </HStack>
        </CardFooter>
    </Card>
  )
}

export default giga