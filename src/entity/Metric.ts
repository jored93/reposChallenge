import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn, BaseEntity} from "typeorm"
import { Repository } from "./Repository"

@Entity()
export class Metric extends BaseEntity {

    @PrimaryColumn()
    @JoinColumn({name: "repository"})
    id_repository: number

    @Column({nullable: false, type: "double precision"})
    coverage!: number

    @Column({nullable: false, type: "integer"})
    bugs!: number

    @Column({nullable: false, type: "integer"})
    vulnerabilities!: number

    @Column({nullable: false, type: "integer"})
    hotspots!: number

    @Column({nullable: false, type: "integer"})
    code_smells!: number
}
