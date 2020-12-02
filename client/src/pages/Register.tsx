import React from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface FormData {
	forenames: string;
	surname: string;
	email: string;
	dateOfBirth: string;
}

export const Register: React.FC = ()=> {
	const { register, handleSubmit } = useForm<FormData>();

	const onSubmit = handleSubmit(({ forenames, surname, email, dateOfBirth }) => {
		console.log(forenames, surname, email, dateOfBirth);
	});

	return (
		<Container mt={10}>
				<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
					<Heading>Lecturer's Portal</Heading>
					<Text>Register to get started.</Text>
				</Box>
				<form onSubmit={onSubmit}>
					<FormControl id="email-address" isRequired mt={5}>
						<Input name="email" type="email" placeholder="Email Address" ref={register} />
					</FormControl>
					<FormControl id="forenames" isRequired mt={5}>
						<Input name="forenames" placeholder="Forenames"  ref={register}/>
					</FormControl>
					<FormControl id="surname" isRequired mt={5}>
						<Input name="surname" placeholder="Surname" ref={register} />
					</FormControl>
					<FormControl id="date-of-birth" isRequired mt={5}>
						<FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>
						<Input type="date" name="dateOfBirth" placeholder="Date of birth (dd-MM-yyyy)" ref={register} />
					</FormControl>
					<Button type="submit" bg="#3B28CC" mt={5} colorScheme="blue">Sign Up</Button>
				</form>
		</Container>
	);

}