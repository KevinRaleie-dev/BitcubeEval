import { Box, Text } from '@chakra-ui/react'
import React from 'react';
import { useLocation } from 'react-router-dom';

type NavItemProps = {
    title: string;
    url?: string;
    icon?: any; //get the right type for this icon
}

export const NavItem: React.FC<NavItemProps> = ({title, url, icon}) => {
    const location = useLocation()
    return (
        <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        bgColor={location.pathname === url ? "#21e6c1" : ""}
        _hover={{backgroundColor: "#21e6c1", transition:"0.7s ease-in-out"}}  
        borderRadius={5}
        p={2}
        >
            {icon}
            <Text ml={2} 
            fontWeight={500}
            >{title}</Text>
        </Box>
    )
}

// #21e6c1