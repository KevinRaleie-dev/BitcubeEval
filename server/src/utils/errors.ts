import { Lecturer } from "../entity/Lecturer";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class FieldError {

    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
export class LecturerResponse {

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => Lecturer, { nullable: true })
    lecturer?: Lecturer
}

