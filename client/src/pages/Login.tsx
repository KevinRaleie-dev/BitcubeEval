import React from 'react';
import { Container, Box, Heading, FormControl, Input, Button, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginLecturerMutation } from '../generated/graphql';

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

        history.push('/');
        console.log(response);
    });

    return (
        <Container mt={10}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Heading>Lecturer's Portal</Heading>
                <Text>Welcome back 👋🏼.</Text>
            </Box>
            <form onSubmit={onSubmit}>
                <FormControl id="surname" isRequired mt={5}>
                    <Input name="surname" placeholder="Surname"  ref={register}/>
                </FormControl>
                <FormControl id="email-address" isRequired mt={5}>
                    <Input name="email" type="email" placeholder="Email Address" ref={register} />
                </FormControl>
                <Button type="submit" bg="#3B28CC" mt={5} colorScheme="blue">Sign In</Button>
            </form>
    </Container>
    );
}