import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Degree } from "./Degree";

@ObjectType()
@Entity()
export class Lecturer extends BaseEntity {
    
    @Field(() => Int)
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

    @Field(() => Date)
    @Column()
    dateOfBirth?: Date;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    fullName: string;

    @Field(() =>[Degree])
    @OneToMany(() => Degree, degree => degree.lecturer, { cascade: true })
    degrees: Array<Degree>;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}