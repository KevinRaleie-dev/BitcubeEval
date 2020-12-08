import { Course } from "../entity/Course";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getManager, getRepository } from "typeorm";
import { CourseInput } from "../utils/courseHandler";
import { Degree } from "../entity/Degree";

@Resolver()
export class CourseResolver {

    // Get all courses
    // TODO: paginate and return with relations
    @Query(() => [Course])
    async courses(): Promise<Course[]> {

        const courseRepository = getRepository(Course);
        const courses = courseRepository.find({
            relations: ["degree"]
        });

        return courses;
    }

    @Query(() => [Course], { nullable: true })
    async getDegreeCourses(
        @Arg('id', () => Int) id: number
    ): Promise<Course[] | undefined>{

        const courseRepository = getRepository(Course);
        const courses = await courseRepository.find({
            relations: ["degree"]
        });

        const res = courses.filter(course => course.degree?.id === id);

        return res;
    }


    // TODO: add a course to a degree
    @Mutation(() => Boolean)
    async addCourse (
        @Arg('input') input: CourseInput
    ): Promise<Boolean> {

        const em = getManager();

        const degree = await em.findOne(Degree, {
            where: {
                id: input.degreeID
            }
        });

        
        if(!degree) {
            return false;
        }
        
        const course = em.create(Course, {
            courseName: input.courseName,
            durationInMonths: input.durationMonths,
            degree: input.degreeID as any
        });

        await em.save(course);

        degree.courses = [];

        degree.courses?.push(course);

        await em.save(degree);

        return true;
    }
}