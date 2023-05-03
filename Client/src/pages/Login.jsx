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
import GenerateHashedPassword from '../tools/Hashing';

import { useRef, useState } from 'react';

export default function Login() {
    const [sending,setSending] =  useState(false);
    const [ErrorState, setErrorState] = useState(false);
    const Name = useRef("");
    const Password = useRef("");
    
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
        // check response status: 
        if ( response.status === 200 ) {
          console.log( response.data);
          return;
        }
        else{
          setErrorState(true);
          // clear : 
          Email.current.value = "";
          Password.current.value = "";
          console.error(response);
          return;
        }
    };
    return(
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        {ErrorState && (
            <Alert status='error' my={3}>
              <AlertIcon />
              <AlertTitle>Oooops !!</AlertTitle>
              <AlertDescription>Your Email is not valid .</AlertDescription>
          </Alert>
          )}
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
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
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
