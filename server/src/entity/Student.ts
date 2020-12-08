import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Degree } from "./Degree";

@ObjectType()
@Entity()
export class Student {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    forenames: string;

    @Field()
    @Column()
    surname: string;

    @Field()
    @Column()
    emailAddress: string;

    @Field()
    @Column()
    dateOfBirth: Date;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    fullName: string;

    @Field(() => Degree, { nullable: true })
    @ManyToOne(() => Degree, degree => degree.students)
    degree: Degree;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

}