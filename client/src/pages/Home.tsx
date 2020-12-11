import { Box, Button, Container, Grid, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

export const Home: React.FC<RouteComponentProps> = (props) => {
    return (
        <>
            <Container mt={10}>
                <Box display="flex" flexDirection='column' justifyContent='center' alignItems='center'>
                    <Heading as="h2" size="3xl" mt={5}>
                        Lecturer's Portal
                    </Heading>
                </Box>
                <Image
                mt={5}
                src='./manage.svg'
                />
                <Grid templateColumns="repeat(2, 1fr)" gap={4} p={4}>
                    <Button colorScheme='blue' onClick={() => props.history.push('/register')}>Get Started</Button>
                    <Button onClick={() => props.history.push('/login')}>Sign In</Button>
                </Grid>
            </Container>
        </>
    )
}


