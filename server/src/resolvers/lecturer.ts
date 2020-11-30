import { Lecturer } from "../entity/Lecturer";
import { LecturerResponse } from '../utils/errors';
import { getManager } from 'typeorm';
import { RegisterInput } from '../utils/registerInput';
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class LecturerResolver {

    // need to register a lecturer using their forenames, email and surname
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
                        field: 'email',
                        message: 'Input invalid'
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

    @Query(() => [Lecturer])
    async lecturers ():Promise<Lecturer[]> {
        
        const em = getManager();

        const lecturer = await em.find(Lecturer, {});

        return lecturer;
    }


}