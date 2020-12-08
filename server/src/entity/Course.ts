import { Field, Int, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Degree } from "./Degree";

@ObjectType()
@Entity()
export class Course {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    courseName: string;

    @Field(() => Int)
    @Column()
    durationInMonths: number;

    @Field(() => Degree, { nullable: true})
    @ManyToOne(() => Degree, degree => degree.courses)
    degree: Degree;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}