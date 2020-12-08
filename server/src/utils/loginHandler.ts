import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {

    @Field()
    surname: string;

    @Field()
    email: string;
}