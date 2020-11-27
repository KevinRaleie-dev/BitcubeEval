import { ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./Course";
import { Lecturer } from "./Lecturer";
import { Student } from "./Student";

@ObjectType()
@Entity()
export class Degree {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    degreeName: string;

    @Column()
    durationInYears: string;

    @OneToMany(() => Student, student => student.degree)
    students: Student[];

    @ManyToOne(() => Lecturer, lecturer => lecturer.degress)
    lecturer: Lecturer;

    @ManyToOne(() => Course, course => course.degree)
    courses: Course[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}