import React from 'react';
import { Container, Box, Heading, FormControl, Input, Button, Text, Flex, Spacer, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useLoginLecturerMutation } from '../generated/graphql';
import { setAccessToken } from '../token';

interface FormData {
    email: string;
    surname: string;
}

export const Login: React.FC<RouteComponentProps> = ({history})=> {
    const {register, handleSubmit} = useForm<FormData>();
    const [login] = useLoginLecturerMutation();

    const onSubmit = handleSubmit( async ({email, surname}) => {
        const response = await login({
            variables: {
                email,
                surname
            }
        });

        // need to sort out error handling

        if(response && response.data) {
            setAccessToken(response.data.loginLecturer.accessToken!);
            history.push('/dashboard');
        }
        
    });

    return (
        <>
            <Box
            w="100vw"
            h="100vh"
            bgColor="#071e3d"
            display="grid"
            placeItems="center"
            color="white"
            >
                <Container>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Heading as="h1" mb={3}>Studently 👩🏽‍🎓</Heading>
                        <Text color="gray.100" mb={5}>Sign in to access your dashboard.</Text>
                    </Box>
                    <form onSubmit={onSubmit}>
                        <Stack spacing={5}>
                            <FormControl id="surname" isRequired >
                                <Input name="surname" placeholder="Surname"  ref={register}/>
                            </FormControl>
                            <FormControl id="email-address" isRequired >
                                <Input name="email" type="email" placeholder="Email Address" ref={register} />
                            </FormControl>
                            <Flex>
                                <Spacer />
                                <Box
                                >
                                    <Link to="/register">
                                        <Button variant="link" mr={5}>Sign up</Button>
                                    </Link>
                                    <Button type="submit" bg="#1f4287" colorScheme="#1f4287">Sign in</Button>
                                </Box>
                            </Flex>
                        </Stack>
                    </form>
                </Container>
            </Box>
        </>
    );
}