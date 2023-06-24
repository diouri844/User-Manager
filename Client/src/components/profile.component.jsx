import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function SocialProfileWithImage({name, email, role}) {
    return (
      <Center py={6}>
        <Box
          maxW={'390px'}
          w={'full'}
          ml={32}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={
                'https://www.bing.com/images/search?view=detailV2&ccid=TneqgKQB&id=92B3409541119EC7A195A45B224A1494439CACAD&thid=OIP.TneqgKQBUNi__W7XKshWlAHaHa&mediaurl=https%3a%2f%2fclipground.com%2fimages%2fimg_avatar-png-6.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.4e77aa80a40150d8bffd6ed72ac85694%3frik%3draycQ5QUSiJbpA%26pid%3dImgRaw%26r%3d0&exph=512&expw=512&q=upslash+avatar+img&simid=608028861222974284&FORM=IRPRST&ck=7F70A62CCB5FD2D380CDF65B3E930134&selectedIndex=20'
              }
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                { name }
              </Heading>
              <Text color={'gray.500'}>{ role }</Text>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>Operations</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  0
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>Contact</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                    {email}
                </Text>
              </Stack>
            </Stack>
            <Button
              w={'full'}
              mt={8}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}>
              Details
            </Button>
          </Box>
        </Box>
      </Center>
    );
  }