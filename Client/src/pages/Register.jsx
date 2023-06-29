import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Stack,
    Heading,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  
  
  
  import { AtSignIcon, LockIcon, EmailIcon } from '@chakra-ui/icons';
  import axios from "axios"; 
  import { Link } from "react-router-dom";

  import { useRef, useState, useEffect } from 'react';


  export default function Register(){
    const [sending,setSending] =  useState(false);
    const [ErrorState, setErrorState] = useState(false);
    const [SuccessState, setSuccessState] = useState(false);
    const Name = useRef("");
    const Password = useRef("");
    const Email = useRef("");
    useEffect(() =>{
      document.title = "Create a new account";
    },[]);



    async function HandelSubmit(){
        console.log("HandelSubmit \n ");
        setSending(true)
        // extract the name , email and password;
        const emailtoSend = Email.current.value;
        const passwordtoSend = Password.current.value;
        const nametoSend = Name.current.value;
        // create a user payload to send to registration endpoint :
        const payload = {
            name: nametoSend,
            email: emailtoSend,
            password: passwordtoSend,
            role:'Stuff'
        };
        const config =  {
          'header':{
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        };
        console.table(
            payload
        );   
        // send the post request to the server 
        const response = await axios.post(
          "http://localhost:8080/api/users/register",
          payload,
          config
        );
        setSending(false);
        if ( response.data.created ){
          setSuccessState(true);
        }
        console.log( response );
    }

    return(
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        {ErrorState && (
            <Alert status='error' my={3}>
              <AlertIcon />
              <AlertTitle>Oooops !!</AlertTitle>
              <AlertDescription>Your Email is not valid .</AlertDescription>
          </Alert>
          )}
        {SuccessState && (
            <Alert status='success' my={3}>
              <AlertIcon />
              <AlertTitle>{ UserState?.message }</AlertTitle>
              {UserState?.connected && (
                <AlertDescription>
                  { UserState?.user?.name } 
                </AlertDescription>  
              )}
              
          </Alert>
          )
        }
        <Stack spacing="8">
          <Heading size={{ base: 'sm', md: 'md' }} color='black'>  
          Create your account
          </Heading>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="name">
                <AtSignIcon boxSize={5}  color='pink' mx={2} />
                  User-Name
                </FormLabel>
                <Input id="name" type="text" ref={Name} />
              </FormControl>
            </Stack>

            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">
                <EmailIcon boxSize={5}  color='pink' mx={2} />
                  Email
                </FormLabel>
                <Input id="email" type="email" ref={Email} />
              </FormControl>
            </Stack>
            
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="password">
                <LockIcon boxSize={5}  color='pink' mx={2} />
                  Password</FormLabel>
                <Input id="password" type="password" ref={Password} />
              </FormControl>
            </Stack>
            
            <HStack justify="space-between">
              <Link
              variant="link" 
              tagName="Button"
              to="/"
              colorScheme="pink" size="sm"
              className='underline text-primary hover:underline'
              >
                already have an account!
              </Link>
            </HStack>

            <Stack spacing="6">
              <Button
              onClick={()=> HandelSubmit() } 
              colorScheme='blue' variant='solid'>
                  { sending && <Spinner color='white' /> }
                  { !sending && (<span>Sign up</span>) }
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
  </Container>  
)}