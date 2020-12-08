import { Student } from "../entity/Student";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getManager, getRepository } from "typeorm";
import { isAuth } from "../middleware/isAuth";
import { StudentInput } from "../utils/studentHandler";
import { StudentResponse } from "../utils/errorHandler";
import { Degree } from "../entity/Degree";

@Resolver()
export class StudentResolver {

    @Query(() => [Student])
    async getStudents(): Promise<Student[]> {

        const studentRepository = getRepository(Student);
        const students = await studentRepository.find({relations: ["degree"]});

        return students;
    }


    @Mutation(() => StudentResponse)
    @UseMiddleware(isAuth)
    async addStudent(
        @Arg('input') input: StudentInput,
    ): Promise<StudentResponse> {
       
        const em = getManager();

        const degree = await em.findOne(Degree, {
            where: {
                id: input.degreeID
            }
        });
        
        if(!degree) {
            return {
                errors: [
                    {
                        field: "Degree foreign key",
                        message: "Degree does not exist"
                    }
                ]
            }
        }

        const checkIfStudentExists = await em.findOne(Student, {
            where: {
                emailAddress: input.email
            }
        });

        if(checkIfStudentExists) {
            return {
                errors: [
                    {
                        field: 'Email',
                        message: 'Student already exists.'
                    }
                ]
            }
        }

        const student = em.create(Student, {
            forenames: input.forenames,
            emailAddress: input.email,
            surname: input.surname,
            dateOfBirth: input.dateOfBirth,
            firstName: input.forenames.split(' ')[0],
            fullName: `${input.forenames} ${input.surname}`,
            degree: input.degreeID as any
        });
        
        degree.students = [];
        
        degree.students.push(student);

        await em.save(student);

        await em.save(degree);
        
        return {
            student
        }
    }

}