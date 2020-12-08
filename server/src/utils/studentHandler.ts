import { Field, InputType, Int } from "type-graphql";

@InputType()
export class StudentInput {

    @Field()
    forenames: string;

    @Field()
    email: string;

    @Field()
    surname: string;

    @Field()
    dateOfBirth: Date;

    @Field(() =>  Int)
    degreeID: number
}