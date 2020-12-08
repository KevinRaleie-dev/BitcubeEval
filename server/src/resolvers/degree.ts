import { Degree } from "../entity/Degree";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getManager, getRepository } from "typeorm";
import { isAuth } from "../middleware/isAuth";
import { AppContext } from "../utils/context";
import { DegreeInput } from "../utils/degreeHandler";
import { Lecturer } from "../entity/Lecturer";

@Resolver()
export class DegreeResolver {

    // Get all degrees
    // TODO: paginate, and return along with relations
    @Query(() => [Degree])
    async getDegrees():Promise<Degree[]> {

        const degreeRepository = getRepository(Degree);
        const degrees = await degreeRepository.find({
            relations: ["lecturer", "students", "courses"]
        });

        return degrees;
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


    // Create a degree
    @Mutation(() => Degree)
    @UseMiddleware(isAuth)
    async addDegree(
        @Arg('input') input: DegreeInput,
        @Ctx() { payload }: AppContext 
    ): Promise<Degree> {

        const em = getManager();

        const checkIfDegree = await em.findOne(Degree, {
            where: {
                degreeName: input.degreeName
            }
        });

        if(checkIfDegree) {
            throw new Error('Can not have more than one degree with the same name.');
        }

        const degree = em.create(Degree, {
            degreeName: input.degreeName,
            durationInYears: input.durationYears,
            lecturer: payload!
        });

        await em.save(degree);
        
        const loggedInLecturer = await em.findOne(Lecturer, {
            where: {
                id: payload.id
            }
        });
        
        // deleted the lecturer for some reason
        if(!loggedInLecturer) {
            throw new Error("could not find lecturer");
        }
        
        loggedInLecturer.degrees = [];
        
        loggedInLecturer.degrees.push(degree);

        await em.save(loggedInLecturer);

        return degree;
    }


}