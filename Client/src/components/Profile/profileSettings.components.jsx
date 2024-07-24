import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import layout  :
import { defaultLayout as Layout } from '../../layouts';
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
    Center,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
  } from '@chakra-ui/react';

  // import icons :
  import { SmallCloseIcon, SmallAddIcon } from '@chakra-ui/icons';



  // import axios :
  import myAxiosInstance from "../../providers/axios.provider";


function profileSettings() {
  // set used state :
  const [isloading, setIsloading] = useState(false);
  const [isNameChange, setIsNameChange] = useState(false);
  const [isEmailChange, setIsEmailChange] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [AlertMessage , setAlertMessage] = useState("");
  const [isError , setIsError] = useState(false);
  const [isNotif , setIsNotif ] = useState(false);
  // set neavigator to redirect :
  const navigate = useNavigate();
  // set ref to handel inputs :
  const userName = useRef("");
  const userEmail = useRef("");
  const emailConfrime = useRef("");
  const userPassword = useRef("");
  const passwordConfirme = useRef("");
  // submit handler :
  const HandelUserUpdate = ()=>{
    // set loading state while response is awaited :
    setIsloading(true);
    // check if there is a changes to handel :
    if( !isEmailChange && !isPasswordChange &&  !isNameChange){
      setIsError(true);
      setAlertMessage("No changes detected . ");
      // set time out :
      setTimeout(
        ()=> {
          setIsError(false);
          setAlertMessage("");
          setIsloading(false);
        },2500
      );
      return;
    }
    // create a new user payload :
     let currentUserPayload = {};
    // check the new user credentinale :
    // check user name updates :
    if( isNameChange ){
      // extract the current user name :
      const inputName = userName.current.value;
      if(
        inputName.length < 4 ||
        inputName.includes(' ') ||
        inputName.trim().length === 0
        ){
          setIsError(true);
          setAlertMessage(
            "Please enter a valid user name"
          );
          // clear all :
          setTimeout(
            ()=>{
              setIsNameChange(false);
              setAlertMessage('');
              setIsError(false);
              setIsloading(false)
            },2500
          );
          return;
        }
        // all is greate : add the username to the current user:
        currentUserPayload.name = inputName;
    }
    // check user email updates :
    if( isEmailChange ) {
      // get the current value of the usr email and the confirmations email :
      const inputEmail = userEmail.current.value;
      const inputConfirmeEmail = emailConfrime.current.value;
      // check if is the same :
      if (inputEmail != inputConfirmeEmail ){
        // set error state :
        setIsError(true);
        // set alert message :
        setAlertMessage(
          "Email and Confirmation not the same, please try again"
        );
        // clear the confrimation input :
        setTimeout(
          ()=>{
            emailConfrime.current.value = "";
            // reset all changed states :
            setIsEmailChange(false);
            setAlertMessage("");
            setIsError(false);
            setIsloading(false);
          },2500
        );
        return;
      }
      // check if is a valide email address :
      if(
        inputEmail.length < 6  ||
        inputEmail.includes(' ') ||
        inputEmail.trim().length === 0 ){
        // invalid email address :
        setIsError(true);
        setAlertMessage("Please enter a valid email address.");
        // clear the confrimation input :
        setTimeout(
          ()=>{
            userEmail.current.value = "";
            emailConfrime.current.value = "";
            // reset all changed states :
            setIsEmailChange(false);
            setAlertMessage("");
            setIsError(false);
            setIsloading(false);
          },2500
        );
        return;

      }
      // all is greate : add user email to the new user payload :
      currentUserPayload.email = inputEmail;
    }
    // check if the new password is
    if( isPasswordChange ){
      // check if is a valide password :
      const inputPassword = userPassword.current.value;
      const confimeinput  = passwordConfirme.current.value;
      if (  inputPassword.length < 7 ||
            inputPassword.includes(' ') ||
            inputPassword.trim().length === 0
        ){
          setIsError(true);
          setAlertMessage("Please enter a valid password.");
          // clear the confrimation input :
          setTimeout(
            ()=>{
              setIsError(false);
              setIsloading(false);
              setAlertMessage("");
              // clear input password and confirmation input :
              userPassword.current.value = "";
              passwordConfirme.current.value = "";
            },2500
          );
        }
        if( inputPassword != confimeinput ){
          setIsError(true);
          setAlertMessage("Password and confirmation not match ");
          setTimeout(
            ()=>{
              setIsError(false);
              setIsloading(false);
              setAlertMessage("");
              // clear input password and confirmation input :
              userPassword.current.value = "";
              passwordConfirme.current.value = "";
            },2500
          );
        }
        /* send a check request to check if the new password is not the
         same as the previous
        */
        const payload =  {
          password:inputPassword
        };
        const config =  {
          'headers':{
              'Content-Type': 'application/json',
              'Accept': '*/*'
          }
        };
        // extract userid from localstorage:
        const { UserId } = window.localStorage;
        // send check request :
        myAxiosInstance.post(
          `users/checkPassword/${UserId}`,
          payload,
          config
        ).then(
          response => {
            // check response state :
            if ( response.data.message === "success"){
              // the response geted successfully :
              // check state of isEquale status :
              if ( response.data.isEquales ){
                // set error state :
                setIsloading(false);
                setIsError(true);
                setAlertMessage("the new password hould be different than the previous ");
                // set atime out :
                setTimeout(
                  ()=>{
                    setIsError(false);
                    setAlertMessage('');
                    // cleare the password field :
                    userPassword.current.value = "";
                    passwordConfirme.current.value = "";
                    // update the isPassword change state :
                    setIsPasswordChange(false);
                  },2500
                )
              }
            }
          }
        ).catch( err => {
          console.error( err );
          setIsloading(false);
        });
        // all is greate add password to current user :
        currentUserPayload.password = inputPassword;
    }
    // get the barrer token to handel the put request :
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
    // create a config object :
    var config = {
      'headers':{
        'Authorization': barrer,
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    };
    // send request :  my user payload is ready :
    myAxiosInstance.put(
      `manager/feeds/${UserId}`,
      currentUserPayload,
      config
    ).then(
      response => {
        // check the response state :
        if ( response.data.message === 'Success'){
          // current user updated successfully
          setIsNotif(true);
          setAlertMessage("User updated successfully , redirect to login page");
          setTimeout(
            ()=>{
              setIsNotif(false);
              setAlertMessage("");
              // cleare the auth token :
              window.localStorage.removeItem('AuthToken');
              navigate('/');
            },2500
          );
        }
      }
    ).catch( err => {
      console.error( err );
      // set a error state :
      setIsError( true );
      setAlertMessage("Erro update user infromations , try later.");
      setTimeout(
        ()=>{
          setIsError(false);
          setAlertMessage("");
          navigate("/settings");
        },2500
      );
    });

  }
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
        myAxiosInstance.get(
          `manager/feeds/${UserId}`,
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
            }
          }
        ).catch( err => {
          console.error( err );
          setIsError( true );
          setAlertMessage('Session Error occurred , please try again later ');
          setTimeout(
            ()=>{
              setIsError(false);
              setAlertMessage("");
              navigate('/');
            },2500
          );
        });
      }catch( error ){
        setIsError( true );
        setAlertMessage('Session Error occurred , please try again later ');
        setTimeout(
          ()=>{
            setIsError(false);
            setAlertMessage("");
            navigate('/');
          },2500
        );
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
        {/* add conditional alert render  */}
        {isError &&
          (
            <Container maxW="100%">
                <Alert status='warning' my={0}>
                  <AlertIcon />
                  <AlertTitle>
                    { AlertMessage }
                  </AlertTitle>
              </Alert>
            </Container>

          )
        }
        {isNotif &&
          (
            <Container maxW="100%">
                <Alert status='success' my={0}>
                  <AlertIcon />
                  <AlertTitle>
                    { AlertMessage }
                  </AlertTitle>
              </Alert>
            </Container>

          )
        }
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
              <Button w="full"> My Profile </Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            onChange={()=> setIsNameChange(true)}
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
        <FormControl id="password" isOptional>
          <FormLabel>New Password (optional)</FormLabel>
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
            leftIcon={<SmallAddIcon />}
            bg={'blue.400'}
            color={'white'}
            isLoading={isloading}
            loadingText='Saving changes ...'
            colorScheme={'blue.600'}
            variant='outline'
            w="full"
            onClick={
              (e)=> {
                e.preventDefault();
                HandelUserUpdate()
              }
            }
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
