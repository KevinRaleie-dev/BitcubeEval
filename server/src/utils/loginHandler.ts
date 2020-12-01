import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class LoginInput {

    @Field()
    surname: string;

    @Field()
    email: string;
}

@ObjectType()
export class LoginResponse {

    @Field()
    accessToken: string;
}