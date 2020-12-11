import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

const Nav: React.FC<RouteComponentProps> = (props) => {
    return (
        <Flex 
        bg="white" 
        w="100%" 
        p={4} 
        color="black"
        borderBottomWidth='1px'
        >
            <Link to="/">
                <Text 
                fontSize='3xl' 
                fontWeight='bold'
                >
                    <span role='img' aria-label='Image'>🧑🏼‍🏫 </span>Lecturer Portal
                </Text>
            </Link>
            <Box ml={"auto"}
            >
                <Stack display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                    <Link to="/dashboard">
                        <Text mx={5} mt={3}>
                            Dashboard
                        </Text>   
                    </Link>
                    <Box ml={"auto"}>     
                        <Button onClick={() => props.history.push('/login')} marginRight={4} variant='outline' colorScheme='blue'>Sign in</Button>       
                        <Button onClick={() => props.history.push('/register')} colorScheme='blue' bg='#6b63ff'>Sign up</Button>  
                    </Box> 
                </Stack>
            </Box>
        </Flex>
    )

}

export default withRouter(Nav);