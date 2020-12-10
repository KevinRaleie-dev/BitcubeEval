import 'dotenv/config';
import { Lecturer } from "../entity/Lecturer";
import { LecturerResponse } from '../utils/errorHandler';
import { getManager, getRepository } from 'typeorm';
import { RegisterInput } from '../utils/registerHandler';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { LoginInput } from "../utils/loginHandler";
import { LoginResponse } from "../utils/errorHandler";
import { AppContext } from '../utils/context';
import { createAccessToken, createRefreshToken } from '../auth/auth';
import { isAuth } from '../middleware/isAuth';
import { Degree } from '../entity/Degree';

@Resolver()
export class LecturerResolver {

	// Get all lecturers 
	@Query(() => [Lecturer])
	async lecturers ():Promise<Lecturer[]> {
			
		const em = getManager();

		const lecturer = await em.find(Lecturer, { relations: ["degrees"]});

		return lecturer;
	}

	// Get lecturer by their id
	@Query(() => Lecturer, { nullable: true })
	@UseMiddleware(isAuth)
	async getLecturer(
		@Ctx() {payload}: AppContext
	): Promise<Lecturer | undefined> {
		const em = getManager();

		return await em.findOne(Lecturer, {
			id: payload.id
		}, {relations: ["degrees"]});

	}


    // Filter through degrees and return only the lecturer with the provided id
    @Query(() => [Degree], {nullable: true})
    @UseMiddleware(isAuth)
    async getLecturerStudents(
        @Ctx() { payload }: AppContext
    ): Promise<Degree[] | undefined> {
        const degreeRepository = getRepository(Degree);
        const degrees = await degreeRepository.find({
            relations: ["lecturer", "students"]
        });

        const res = degrees.filter(degree => degree.lecturer?.id === payload.id);

        return res;
    } 


	// Register a lecturer
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
									message: 'User already exists'
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
	
	// Login a lecturer
	@Mutation(() => LoginResponse)
	async loginLecturer(
		@Arg('input') input: LoginInput,
		@Ctx() { res }: AppContext
	): Promise<LoginResponse> {

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
						message: 'Invalid email or surname'
					}
				]
			}
		}

		// return an access and refresh token

		res.cookie('rememberme',
			createRefreshToken(lecturer), {
				httpOnly: true
			}
		)

		return {
			accessToken: createAccessToken(lecturer)
		}

	}
}