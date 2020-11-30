import { Lecturer } from "../entity/Lecturer";
import { LecturerResponse } from '../utils/errors';
import { getManager } from 'typeorm';
import { RegisterInput } from '../utils/registerInput';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { LoginInput } from "../utils/loginInput";

@Resolver()
export class LecturerResolver {

	// register a lecturer using their forenames, email and surname
	@Query(() => [Lecturer])
	async lecturers ():Promise<Lecturer[]> {
			
		const em = getManager();

		const lecturer = await em.find(Lecturer, {});

		return lecturer;
	}

	@Mutation(() => LecturerResponse)
		async registerLecturer(
			@Arg('input') input: RegisterInput 
	): Promise<LecturerResponse> {

		const em = getManager();
		
		const checkIfExists = await em.findOne(Lecturer, { emailAddress: input.email});

		if(checkIfExists) {
				return {
						errors: [
								{
										field: 'Email',
										message: 'Invalid input'
								}
						]
				}
		}

		const firstname = input.forenames.split(' ')[0];
		const fullname = `${input.forenames} ${input.surname}`

		const lecturer = em.create(Lecturer, {
				forenames: input.forenames,
				emailAddress: input.email,
				dateOfBirth: input.dateOfBirth,
				surname: input.surname,
				firstName: firstname,
				fullName: fullname
		});

		await em.save(lecturer);

		return {
				lecturer
		}
	}

	// login a lecturer with their surname and email
	// return a token back or a boolean
	@Mutation(() => LecturerResponse)
	async loginLecturer(
		@Arg('input') input: LoginInput
	): Promise<LecturerResponse> {

		const em = getManager();

		const lecturer = await em.findOne(Lecturer, {
			where: [
				{ emailAddress: input.email, surname: input.surname }
			]
		});

		if (!lecturer) {
			return {
				errors: [
					{
						message: "Invalid email or surname"
					}
				]
			}
		}

		// for now just return the lecturer
		// will add token middleware later
		return {
			lecturer
		}

	}



}