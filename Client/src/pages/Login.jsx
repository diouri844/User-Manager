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



import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import axios from "axios"; 
//import GenerateHashedPassword from '../tools/Hashing';
import { Link, useNavigate  } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

export default function Login() {
    const [sending,setSending] =  useState(false);
    const [ErrorState, setErrorState] = useState(false);
    const [SuccessState, setSuccessState] = useState(false);
    const [UserState, setUserState] = useState({});
    const [UserError, setUserError] = useState({})
    const myNavigate = useNavigate();
    const Name = useRef("");
    const Password = useRef("");
    useEffect( ()=>{
      // set the doc title to the login page :
      document.title = "Login into you account :)";
    },[]);

    async function  HandelSubmit(){
        // get current values : 
        setSending(true);
        // get input data :
        const sended_name = Name.current.value;
        const sended_password = Password.current.value;
        // create a json object to send to the server endpoit ;
        //  
        const Payload =  {
          name: sended_name,
          password : sended_password
        };
        console.log( Payload);
        const config =  {
          'header':{
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        };
        // send post request : 
        const response = await axios.post(
          "http://localhost:8080/api/users/login",
          Payload,
          config
        );
        setSending(false);
        if ( response.data.connected ) {
          setSuccessState(true);
          setUserState({...response.data}); 
          const token = response.data.token;
          const user_id = response.data.user._id
          // dislay a popup for auth status : 
          setTimeout(
            ()=>{
              // clear : 
              Name.current.value = "";
              Password.current.value = "";
              // reset states : 
              setSuccessState(false);
              // set a global state : 
              window.localStorage.setItem("AuthToken",token);
              window.localStorage.setItem("UserId",user_id);
              // redirect the the dash :
              myNavigate('/profile'); 
            },2500
          );
        }
        else{
          console.error(response);
          setUserError({...response.data});
          setErrorState(true);
          setTimeout(
            ()=>{
              // clear : 
              Name.current.value = "";
              Password.current.value = "";
              // reset states : 
              setErrorState(false);
            },2500
          );
          return;
        }
    };
    return(
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        {ErrorState && (
            <Alert status='error' my={3}>
              <AlertIcon />
              <AlertTitle>Oooops !!</AlertTitle>
              <AlertDescription>
                { UserError.message }
              </AlertDescription>
          </Alert>
          )
        }
        {SuccessState && (
            <Alert status='success' my={3}>
              <AlertIcon />
              <AlertTitle>{ UserState?.message }</AlertTitle>
              {UserState?.connected && (
                <AlertDescription>
                  Welcome back : { UserState?.user?.name } 
                </AlertDescription>  
              )}
              
          </Alert>
          )
        }
        <Stack spacing="8">
          <Heading size={{ base: 'sm', md: 'md' }} color='black'>  
          Welcome Back
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
                <FormLabel htmlFor="email">
                <AtSignIcon boxSize={5}  color='pink' mx={2} />
                  User-Name
                </FormLabel>
                <Input id="email" type="text" ref={Name} />
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
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
              <Link variant="link" tagName="Button"
              to="/register"
              colorScheme="pink" size="sm"
              className='underline text-primary'
              >
                Create New account
              </Link>
            </HStack>

            <Stack spacing="6">
              <Button
              onClick={
                (e )=>{
                  e.preventDefault();
                  console.log(" this is my submit handler ");
                  HandelSubmit();
                }
              } 
              colorScheme='blue' variant='solid'>
                  { sending && <Spinner color='white' /> }
                  { !sending && (<span>Sign in</span>) }
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
  </Container>  
)}
