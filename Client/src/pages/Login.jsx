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



import { EmailIcon, LockIcon } from '@chakra-ui/icons'

import { useRef, useState } from 'react';

export default function Login() {
    const [sending,setSending] =  useState(false);
    const [ErrorState, setErrorState] = useState(false);
    const Email = useRef("");
    const Password = useRef("");
    
    const HandelSubmit = ()=>{
        // get current values : 
        setSending(true);
        // get input data :
        const sended_email = Email.current.value;
        const sended_password = Password.current.value;
        // check if is validate : 
        if ( 
          sended_email.length === 0 || sended_email.includes(' ')  
        ){
          // set an error state : 
          setErrorState(true);
          // self closing 
          setTimeout(
            ()=>{
              setErrorState(false)
              setSending(false);
              // clear email field : 
              Email.current.value = "";
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
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>

            <Stack spacing="6">
              <Button
              onClick={()=>{ HandelSubmit() }} 
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