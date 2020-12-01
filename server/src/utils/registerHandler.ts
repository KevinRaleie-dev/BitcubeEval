import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {

    @Field()
    forenames: string;

    @Field()
    email: string;

    @Field()
    surname: string;

    @Field()
    dateOfBirth: Date;
}