import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum roles {
    BASIC = 'basico',
    MEDIUM = 'medio',
    MEDIUMHIGH = 'medioalto',
    HIGHMEDIUM = 'altomedio',
    HIGH = 'alto'
}

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    name!: string

    @Column({ nullable: false })
    lastname!: string

    @Column({ unique: true, nullable: false })
    email!: string

    @Column({ nullable: false })
    password!: string

    @Column({ nullable: true })
    salt!: string

    @Column({
        type: 'enum',
        enum: roles,
        default: roles.BASIC
    })
    role!: string
}