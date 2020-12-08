import { Field, Int, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./Course";
import { Lecturer } from "./Lecturer";
import { Student } from "./Student";

@ObjectType()
@Entity()
export class Degree {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    degreeName: string;

    @Field(() => Int)
    @Column()
    durationInYears: number;

    @Field(() => [Student], {nullable: true})
    @OneToMany(() => Student, student => student.degree, { cascade: true })
    students: Array<Student>;

    @Field(() => Lecturer, {nullable: true})
    @ManyToOne(() => Lecturer, lecturer => lecturer.degrees)
    lecturer: Lecturer;

    @Field(() => [Course], {nullable: true})
    @ManyToOne(() => Course, course => course.degree, { cascade: true })
    courses: Array<Course>;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

}