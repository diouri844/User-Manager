import React from 'react'

import { Tooltip, HStack  } from '@chakra-ui/react';
import {    AddIcon,
            EditIcon,
            SearchIcon,
            DeleteIcon,
            StarIcon } from '@chakra-ui/icons';


// create a array of all the available operations :



function toolbare() {
  return (
    <HStack
    bgColor={"gray.50"}
    rounded={25}
    position={"fixed"}
    z-index={100}
    py={3}
    px={6}
    mt={-20}
    mx={15}
    spacing={12}>
        <Tooltip
            hasArrow
            label='Search for a specific feed '
            bg='gray.100'
            color='black'
            placement='top'
            onClick={()=> console.log("search for a specific feed ")}
            >
            <SearchIcon
                color='gray.700'
                boxSize={4}
                cursor={"pointer"}
            />
        </Tooltip>

        <Tooltip
            hasArrow
            label='Add new feed'
            bg='gray.100'
            color='black'
            placement='top'
            onClick={()=> console.log("Add new feed")}
            >
            <AddIcon
                color='gray.700'
                boxSize={4}
                cursor={"pointer"}
            />
        </Tooltip>

        <Tooltip
            hasArrow
            label='My feeds'
            bg='gray.100'
            color='black'
            placement='top'
            onClick={()=> console.log("My feeds")}
            >
            <EditIcon
                color='gray.700'
                boxSize={4}
                cursor={"pointer"}
            />
        </Tooltip>

        <Tooltip
            hasArrow
            label='Deleted feeds'
            bg='gray.100'
            color='black'
            placement='top'
            onClick={()=> console.log("Deleted feeds")}
            >
            <DeleteIcon
                color='gray.700'
                boxSize={4}
                cursor={"pointer"}
            />
        </Tooltip>

        <Tooltip
            hasArrow
            label='Stared feeds'
            bg='gray.100'
            color='black'
            placement='top'
            onClick={()=> console.log("Stared feeds")}
            >
            <StarIcon
                color='gray.700'
                boxSize={4}
                cursor={"pointer"}
            />
        </Tooltip>
    </HStack>


    );
}
export default toolbare;
