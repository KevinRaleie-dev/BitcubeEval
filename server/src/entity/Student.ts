import { ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Degree } from "./Degree";

@ObjectType()
@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    forenames: string;

    @Column()
    surname: string;

    @Column()
    emailAddress: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    firstName: string;

    @Column()
    fullName: string;

    @ManyToOne(() => Degree, degree => degree.students)
    degree: Degree;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}