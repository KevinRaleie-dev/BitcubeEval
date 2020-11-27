import { ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Degree } from "./Degree";

@ObjectType()
@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    courseName: string;

    @Column()
    durationInMonths: number;

    @ManyToOne(() => Degree, degree => degree.courses)
    degree: Degree;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}