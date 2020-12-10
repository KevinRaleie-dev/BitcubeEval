import { Lecturer } from "../entity/Lecturer";
import { Field, ObjectType } from "type-graphql";
import { Student } from "../entity/Student";
import { Degree } from "../entity/Degree";

@ObjectType()
class FieldError {

    @Field({nullable: true})
    field?: string;

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

@ObjectType()
export class StudentResponse {

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => Student, { nullable: true })
    student?: Student
}
@ObjectType()
export class DegreeResponse {

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => Degree, { nullable: true })
    student?: Degree
}

@ObjectType()
export class LoginResponse {

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field({nullable: true})
    accessToken?: string;
}

