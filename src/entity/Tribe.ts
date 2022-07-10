import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , BaseEntity, JoinColumn, OneToMany} from "typeorm"
import { Organization } from "./Organization"
import { Repository } from "./Repository"

@Entity()
export class Tribe  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tribe: number

    @ManyToOne(() => Organization, organization => organization.tribes, {eager: true, onDelete: "CASCADE"})
    @JoinColumn({name: "organization"})
    organization: Organization;

    @Column({length: 50,unique: true, nullable: false,})
    name!: string

    @Column({nullable: false, default: 1})
    status!: number
    
    @OneToMany(() => Repository, repository => repository.tribe)
    repositories: Repository[];
}