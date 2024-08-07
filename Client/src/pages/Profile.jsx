import React, { useEffect, useState } from 'react'
import myAxiosInstance from "../providers/axios.provider";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Container, Grid, Heading, Text } from '@chakra-ui/react';
import { SocialProfileWithImage, SimpleSidebar } from '../components';
import { useNavigate } from "react-router-dom";

import { defaultLayout as Layout } from '../layouts';


function Profile() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [isSessionError, setSessionError] = useState(false);
    const navigation = useNavigate();
    useEffect(
        ()=>{
            // update doc title :
            document.title = `My Profile`;
            try{
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
                // get the local logged user from loca storage:
                const config =  {
                    'headers':{
                        'Authorization': barrer,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                };
                // try to get the user by id :
                myAxiosInstance.get(`manager/feeds/${UserId}`,
                config
                ).then(
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
                ).catch( err =>
                    {
                        setSessionError(true);
                        console.error(
                        "\t ::> fetch user profile error : \n ",err);
                        // try to popup a session error message and redirect to login page again :
                        setTimeout(
                            ()=>{
                                setSessionError(false);
                                // redirect to login page :
                                navigation('/');
                            },2500
                        );
                    }
                );
            }catch ( err ){
                setSessionError(true);
                console.error(
                    "\t ::> login auth error : \n ",err
                );
                setTimeout(
                    ()=>{
                        setSessionError(false);
                        // redirect to login page :
                        navigation('/');
                    },2500
                );
            }
        },[]
    );
    const user = {
        name: userName,
        email: userEmail,
        role: userRole
    }
  return (
    <>
         <Layout>
            { isSessionError &&
                <Alert className='absolute'
                status='error'
                variant='solid'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='300px'>
                    <AlertIcon boxSize='60px' mr={0} />
                    <AlertTitle  mt={4} mb={1} fontSize='lx' >
                        Eroor occured :
                    </AlertTitle>
                    <AlertDescription maxWidth='xl' >
                        Session error , authentification required please try again
                    </AlertDescription>
                </Alert>
            }
            {!isSessionError &&
                    <SocialProfileWithImage
                    name={ user.name }
                    email={ user.email }
                    role={ user.role }
                    />
            }
        </Layout>
    </>

  )
}

export default Profile
