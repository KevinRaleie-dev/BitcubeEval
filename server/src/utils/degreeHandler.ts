import { Field, InputType, Int } from "type-graphql";

@InputType()
export class DegreeInput {

    @Field()
    degreeName: string;

    @Field(() => Int)
    durationYears: number;
    
}