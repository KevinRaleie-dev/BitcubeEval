import { Field, InputType, Int } from "type-graphql";

@InputType()
export class RemoveStudentInput {

    // @Field(() => Int)
    // degreeID: number;

    @Field(() => Int)
    studentID: number;
    
}