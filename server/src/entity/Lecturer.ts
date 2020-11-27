import { ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Degree } from "./Degree";

@ObjectType()
@Entity()
export class Lecturer {
    
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

    @OneToMany(() => Degree, degree => degree.lecturer)
    degress: Degree[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}