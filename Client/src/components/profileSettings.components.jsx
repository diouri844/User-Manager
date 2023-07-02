import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import layout  : 

import { defaultLayout as Layout } from '../layouts';
// import shakara component 
import { Container,
   Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Center 
  } from '@chakra-ui/react';

  // import icons : 
  import { SmallCloseIcon, SmallAddIcon } from '@chakra-ui/icons';



  // import axios : 
  import axios from 'axios';




function profileSettings() {
  const [isloading, setIsloading] = useState(false);
  const [isEmailChange, setIsEmailChange] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const navigate = useNavigate();
  const userName = useRef("");
  const userEmail = useRef("");
  const emailConfrime = useRef("");
  const userPassword = useRef("");
  const passwordConfirme = useRef("");

  // fetch the current usr : 
  useEffect(
    ()=> {
      // update the page title : 
      document.title = "Edit Profile";
      try{
        // extract the auth token and the user id from the localStorage: 
        const { AuthToken, UserId } = window.localStorage;
        // check the auth token: 
        var barrer = "Barer ";
        if(AuthToken[0] === '"' && AuthToken[AuthToken.length - 1] === '"'){
          let updatedToken = AuthToken.slice(1,-1);
          barrer += updatedToken;
        }
        else{
          barrer += AuthToken;
        }
        // setup a gofig objetc to send request : 
        const config =  {
          'headers':{
              'Authorization': barrer,
              'Content-Type': 'application/json',
              'Accept': '*/*'
          }
        };
        // send request to get current user info: 
        axios.get(
          `http://localhost:8080/api/manager/feeds/${UserId}`,
          config,
        ).then(
          response => {
            // check state of response : 
            if ( response.data.message === 'Success'){
              // user geted by the request : 
              const currentUser = response.data.user;
              console.table(
                currentUser
              );
              userName.current.value = currentUser.name;
              userEmail.current.value = currentUser.email;
              // password hashed we should change the idea behind
              // update user password
              userPassword.current.value = currentUser.password;
            }
          }
        ).catch( err => {
          console.error( err );
        });
      }catch( error ){
        console.error()
        navigate('/');
      }
    },[]);
  
  return (
    <Layout>
      <Container 
      > 
      <Flex
      minH={'100px'}
      align={'center'}
      justify={'center'}
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" 
              src={
                'https://www.bing.com/images/search?view=detailV2&ccid=TneqgKQB&id=92B3409541119EC7A195A45B224A1494439CACAD&thid=OIP.TneqgKQBUNi__W7XKshWlAHaHa&mediaurl=https%3a%2f%2fclipground.com%2fimages%2fimg_avatar-png-6.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.4e77aa80a40150d8bffd6ed72ac85694%3frik%3draycQ5QUSiJbpA%26pid%3dImgRaw%26r%3d0&exph=512&expw=512&q=upslash+avatar+img&simid=608028861222974284&FORM=IRPRST&ck=7F70A62CCB5FD2D380CDF65B3E930134&selectedIndex=20'
              }>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            ref={userName}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            ref={userEmail}
            onChange={ ()=> setIsEmailChange(true) }
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        { /**   email confrimation if is change  */}
        {isEmailChange && 
          <FormControl id="emailConfirmation" isRequired>
            <FormLabel>Confirme new Email address</FormLabel>
            <Input
              ref={emailConfrime}
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
        }
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            ref={userPassword}
            onChange={()=> setIsPasswordChange(true)}
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        { /** password confrimation if is changed  */}
        {isPasswordChange && 
          <FormControl id="passwordConfirmation" isRequired>
            <FormLabel>Confirme new Password</FormLabel>
            <Input
              ref={passwordConfirme}
              placeholder="password confirmation"
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
        }
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            leftIcon={<SmallCloseIcon />}
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            leftIcon={<SmallAddIcon />}
            bg={'blue.400'}
            color={'white'}
            isLoading={isloading}
            loadingText='Saving changes ...'
            colorScheme={'blue.600'}
            variant='outline'
            w="full"
            onClick={ ()=> setIsloading(true) }
            _hover={{
              bg: 'blue.500',
            }}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Flex>
      </Container>
    </Layout>
  )
}

export default profileSettings