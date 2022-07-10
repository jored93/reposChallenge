import { query } from "express"
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Query } from "typeorm/driver/Query"
import { Tribe } from "./Tribe"

@Entity()
export class Repository extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_repository: number

    @Column({length: 50,unique: true})
    name!: string

    @Column({nullable: false, length: 1, default: 'E'})
    state!: string

    @CreateDateColumn()
    created_time!: Date

    @Column({nullable: false, length: 1, default: 'A'})
    status!: string

    @ManyToOne(() => Tribe, tribe => tribe.repositories, {eager: true, onDelete: "CASCADE"})
    @JoinColumn({name: "repository"})
    tribe: Tribe;
}