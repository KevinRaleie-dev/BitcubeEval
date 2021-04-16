import React from 'react'
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

interface IErrorProps {
    message: string
}

export const Error: React.FC<IErrorProps> = ({message}) => {
    return (
       <>
            <Box
            w="100vw"
            h="100vh"
            display="grid"
            placeItems="center"
            bgColor="#071e3d"
            color="white"
            >
                <Stack spacing={3} align="center">
                    <Text fontWeight="600" fontSize="2xl">
                        {message}
                    </Text>
                    <Link to="/login">
                        <Button
                        backgroundColor="#21e6c1"
                        color="black"
                        >Sign In</Button>
                    </Link>
                </Stack>
            </Box>
       </>
    );
}
