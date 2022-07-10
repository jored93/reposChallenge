import { Entity, Column, PrimaryGeneratedColumn,  BaseEntity, OneToMany  } from "typeorm"
import { Tribe } from "./Tribe"

@Entity()
export class Organization extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_organization: number

    @Column({length: 50,nullable: false, unique: true})
    name!: string

    @Column({nullable: false, default: 1})
    status!: number

    @OneToMany(() => Tribe, tribe => tribe.organization)
    tribes: Tribe[];
}