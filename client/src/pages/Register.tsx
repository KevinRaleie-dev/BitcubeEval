import React from 'react';
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Spacer, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRegisterLecturerMutation } from '../generated/graphql';
import { Link, RouteComponentProps } from 'react-router-dom';

interface FormData {
	forenames: string;
	surname: string;
	email: string;
	dateOfBirth: string;
}

export const Register: React.FC<RouteComponentProps> = ({history})=> {
	const { register, handleSubmit } = useForm<FormData>();
	const [regLecturer] = useRegisterLecturerMutation();

	const onSubmit =  handleSubmit( async ({ forenames, surname, email, dateOfBirth }) => {
		const response = await regLecturer({
			variables: {
				email,
				forenames,
				surname,
				dateOfBirth	
			}
		});

		history.push('/login');
		console.log(response);
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
				<Container mt={10}>
						<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mb={5}>
							<Heading>Studently 👩🏽‍🎓</Heading>
							<Text color="gray.100">Register to get your account set up.</Text>
						</Box>
						<form onSubmit={onSubmit}>
							<Stack spacing={5}>
								<FormControl id="email-address" isRequired >
									<Input name="email" type="email" placeholder="Email Address" ref={register} />
								</FormControl>
								<FormControl id="forenames" isRequired >
									<Input name="forenames" placeholder="Forenames"  ref={register}/>
								</FormControl>
								<FormControl id="surname" isRequired >
									<Input name="surname" placeholder="Surname" ref={register} />
								</FormControl>
								<FormControl id="date-of-birth" isRequired >
									<FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>
									<Input type="date" name="dateOfBirth" placeholder="Date of birth (dd-MM-yyyy)" ref={register} />
								</FormControl>
								<Flex>
									<Spacer />
									<Box>
										<Link to="/login">
											<Button variant="link" mr={5}>Sign in</Button>
										</Link>
										<Button type="submit" bg="#1f4287"  colorScheme="#1f4287">Sign up</Button>
									</Box>
								</Flex>
							</Stack>
						</form>
				</Container>
			</Box>
		</>
	);

}