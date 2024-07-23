// import layout :
import { defaultLayout as Layout } from '../layouts';
import { Alert, AlertIcon, AlertTitle, Container, VStack } from '@chakra-ui/react';
import { FeedList, FeedToolBar } from '../components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Feeds() {
  // set states  :
  const [isSessionError, setIsSessionError] = useState(false);
  const [alertmessage , setAlertMessage] = useState("");
  const navigation = useNavigate();
  // check state on load :
  useEffect(
    ()=>{
      // update page title :
      document.title = "Latest Feeds";
      // get the id and authToken from the localStorage :
      try{
        const { AuthToken, UserId  } = window.localStorage;
        // set the barrer token for the check :
        var barrer = "Barer ";
        if(AuthToken[0] === '"' && AuthToken[AuthToken.length - 1] === '"'){
          let updatedToken = AuthToken.slice(1,-1);
          barrer += updatedToken;
        }
        else{
          barrer += AuthToken;
        }
        // set the config request header :
        const config = {
          'headers':{
            'Authorization': barrer,
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        };
        axios.get(`http://localhost:8080/api/manager/feeds/${UserId}`,
          config
        ).then(
          response => {
            // chech response state :
            if ( response.data.message === "Success"){
              console.log( " all is greate user can feed successufly ");
            }else{
              setIsSessionError(true);
              setAlertMessage(" Session error occured , please logged-in ");
              setTimeout(
                ()=>{
                  // cleare the fieald and states :
                  setIsSessionError(false);
                  setAlertMessage("");
                  navigation('/');
                },2500
              );
            }
          }
        )
      }catch( error ){
        console.error( error );
        setIsSessionError(true);
        setAlertMessage(" Session error , Not Authorized ");
        setTimeout(
          ()=>{
            // cleare the fieald and states :
            setIsSessionError(false);
            setAlertMessage("");
            navigation('/');
            },2500
          );
      }
    },[]
  );

  if ( isSessionError ){
    return (
      <Container
        my={10}
        mx={250}
        p={12}
        >
      <Alert className='absolute'
      status='warning'
      variant="solid"
      flexDirection='column'
      rounded="lg"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="300px"
      width="650px"
      >
        <AlertIcon boxSize="60px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lx">
          { alertmessage }
        </AlertTitle>
      </Alert>
      </Container>
    );
  }


  return (
      <Layout >
        <Container
        mt={1}
        mx={200}
        p={12}
        >
        <VStack spacing={3}>
          <FeedToolBar
          />
          <FeedList
            isAdmin={true}
          />
        </VStack>
        </Container>
    </Layout>
  );
}

export default Feeds
