import React, { ReactNode } from 'react';
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
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiLogOut,
} from 'react-icons/fi';


const LinkItems = [
  { name: 'Feeds', icon: FiHome , target:'/feeds'},
  { name: 'Explore', icon: FiCompass , target:'/explore'},
  { name: 'Favourites', icon: FiStar , target:'/favs'},
  { name: 'Profile Settings', icon: FiSettings, target:'/settings' },
  { name: 'Logout', icon:FiLogOut , target:'/logout'}
];

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
        size="full">
            <DrawerContent>
                <SidebarContent />
            </DrawerContent>
        </Drawer>
      </>
  );
}


const SidebarContent = ({ onClose, ...rest }) => {
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
      {LinkItems.map((link) => (
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
