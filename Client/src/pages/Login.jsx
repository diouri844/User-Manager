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
  Text,
  Spinner
} from '@chakra-ui/react'


import { useRef, useState } from 'react';

export default function Login() {
    const [sending,setSending] =  useState(false);
    const Email = useRef("");
    const Password = useRef("");
    
    const HandelSubmit = ()=>{
        // get current values : 
        setSending(true);
        const sended_email = Email.current.value;
        const sended_password = Password.current.value;
        console.log(
            sended_email,
            sended_password
        );
    };
    return(
  <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
    <Stack spacing="8">
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" ref={Email} />
            </FormControl>
          </Stack>

          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
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