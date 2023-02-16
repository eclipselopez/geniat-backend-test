import { Entity, Column, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import User from './user.entity';

@Entity()
export default class Publication {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    title!: string

    @Column({ nullable: false })
    description!: string

    @Column({ type: "timestamp", default: ()=> "CURRENT_TIMESTAMP"})
    createdDate!: Date

    @Column({ nullable: true })
    creatorName!: string

    @Column({ nullable: true })
    creatorRole!: string
}