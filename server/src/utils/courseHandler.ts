import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CourseInput {

    @Field(() => Int)
    degreeID: number;

    @Field()
    courseName: string;

    @Field(() => Int)
    durationMonths: number;
}