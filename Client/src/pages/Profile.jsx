import React, { useEffect, useState } from 'react'

import axios from 'axios';

import { Container, Grid, Heading, Text } from '@chakra-ui/react';

function Profile() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");


    useEffect(
        ()=>{
            // get the local logged user from loca storage:
            const { AuthToken, UserId} = window.localStorage;
            // create my config object for the request header :
            var barrer = "Barer ";
            if(AuthToken[0] === '"' && AuthToken[AuthToken.length - 1] === '"'){
                let updatedToken = AuthToken.slice(1,-1);
                barrer += updatedToken;
            }
            else{
                barrer += AuthToken;
            }
            const config =  {
                'headers':{
                    'Authorization': barrer,
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            };
            // try to get the user by id : 
            axios.get(`http://localhost:8080/api/manager/feeds/${UserId}`,
            config
            )
            .then(
                res => {
                    // check state : 
                    if ( res.data.message === 'Success'){
                        // set user state :
                        // update it :
                        setUserName(res.data.user.name);
                        setUserEmail(res.data.user.email);
                        setUserRole(res.data.user.role);
                    }
                }
                ).catch( err => console.error(err));
        },[]
    );
    const user = {
        name: userName,
        email: userEmail,
        role: userRole
    }
    console.log( user );
  return (
    <>
         <Container maxW="5xl" 
         py={{ base: '12', md: '24' }} 
         px={{ base: '0', sm: '8' }}> 
                <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="5xl"
                fontWeight="extrabold"
                >
                { user.name }
                </Text>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                <Heading as='h2' size='2xl'>
                </Heading>
                </Grid>
                <Grid item xs={12} sm={6}>
                    
                </Grid>
                <Grid item xs={12} sm={6}>
                    
                </Grid>
            </Grid>
         </Container>
    </>
    
  )
}

export default Profile