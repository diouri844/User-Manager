import React, { ReactNode, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react';



import {
  FiHome,
  FiCompass,
  FiStar,
  FiSettings,
  FiLogOut,
  FiDatabase,
  FiCheckCircle,
} from 'react-icons/fi';


// import axios to handel request : 


import axios from 'axios';


export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
        <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="right"
        size="full" 
        m="15"
        >
            <DrawerContent>
                <SidebarContent />
            </DrawerContent>
        </Drawer>
      </>
  );
}


const SidebarContent = ({ onClose, ...rest }) => {
  const [isAdmin , setIsAdmin ] = useState(false);
  // simple links for stuff user :
  const LinkItems = [
    { name: 'Feeds', icon: FiHome , target:'/feeds'},
    { name: 'Explore', icon: FiCompass , target:'/explore'},
    { name: 'Favourites', icon: FiStar , target:'/favs'},
    { name: 'Profile Settings', icon: FiSettings, target:'/settings' },
    { name: 'Logout', icon:FiLogOut , target:'/logout'}
  ];
  // create a dmin linkes : 
  const AdminLinksItems = [
    { name: 'Feeds', icon: FiHome , target:'/feeds'},
    { name: 'Explore', icon: FiCompass , target:'/explore'},
    { name: 'Favourites', icon: FiStar , target:'/favs'},
    { name: 'Profile Settings', icon: FiSettings, target:'/settings' },
    { name: 'Admin', icon:FiDatabase, target:'/admin'},    
    {name: 'BanedUsers', icon:FiCheckCircle, target:'/baned'},
    { name: 'Logout', icon:FiLogOut , target:'/logout'}
  ];
  useEffect( ()=>{
    try{
      // extract current userid from localstorage : 
      const { AuthToken , UserId } = window.localStorage;
      // check auth to extract the barrer :
      var barrer = "Barer ";
      if ( AuthToken[0] === '"' && AuthToken[AuthToken.length - 1] === "'") {
          let updatedToken  = AuthToken.slice(1,-1);
          barrer += updatedToken; 
      }else{
        barrer += AuthToken;
      }
      // config a request header : 
      const config ={
        'headers':{
          'Authorization':barrer,
          'Content-Type':'application/json',
          'Accept':'*/*'
        }
      };
      // check it the current user is an admin user :
      axios.get(
        `http://localhost:8080/api/manager/feeds/${UserId}`,
        config
      ).then( response => {
        if ( response.data.message === 'Success'){
          const userTarget = response.data.user;
          if ( userTarget.role === 'Admin'){
            setIsAdmin(true);
          }
        }
      }).catch( error => { 
        console.error('::)-> Can not fetch user : => \t'+error);
       });
    }catch( error ){
      console.log( error );
      setIsAdmin(false);
    }
  }, []);

  
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            <NavLink key="profile"
            exact={true}
            to='/profile'>
              My Profile
            </NavLink> 
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {!isAdmin && LinkItems.map((link) => (
        <NavItem  
          key={link.name} icon={link.icon}
          >
            <NavLink 
            key={link.name}
            exact={true}
            to={link.target} >
            {link.name}
            </NavLink>
        </NavItem>
      ))}
      {/** conditional render a admin special links  */}
      {isAdmin &&  AdminLinksItems.map(
        ( adminLink )=> (
          <NavItem key={adminLink.name} 
          icon={adminLink.icon}
          >
            <NavLink 
              key={adminLink.name}    
              to={adminLink.target}>
              { adminLink.name }
            </NavLink>
          </NavItem>
        )
      )}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
