import { Request, Response } from "express"
import Axios from 'axios'

import { Organization} from "../entity/Organization"
import { Tribe } from "../entity/Tribe"
import { Repository } from "../entity/Repository"
import { Metric } from "../entity/Metric"
import axios from "axios"

import ObjectsToCsv from 'objects-to-csv'

const verificated_codes :any= {
    604: "Verificado",
    605: "En espera",
    606: "Aprobado"
}

const state_codes :any = {
    E: "Habilitado",
    D: "Desabilitado",
    A: "Archivado",
}

const verificatedRepositories = async () => {
    try {
        const {data} = await axios.get('https://6eeda843-6f19-4055-96ea-f902255dc389.mock.pstmn.io/verificated_repos')
        return data
    } catch (error) {
        console.log(error)
    }
}

const searchRepository = async (tribeOp: any) => {
    const {repositories} = await verificatedRepositories()

        const repositoryOp = await Repository.query(
            `SELECT re.id_repository, re.name, re.state, re.created_time, re.status, tr.name as tribe, 
            org.name as organization, me.coverage, me.bugs, me.vulnerabilities, me.hotspots, me.code_smells
            FROM repository re
            INNER JOIN tribe tr ON tr.id_tribe = re.repository
            INNER JOIN organization org ON org.id_organization = tr.organization
            INNER JOIN metric me ON me.id_repository = re.id_repository
            WHERE re.repository = ${tribeOp?.id_tribe} `)

        if (!repositoryOp || !repositoryOp.length) throw new Error('No se encontraron repositorios')


        for (const rep of repositoryOp) {
            rep.state = state_codes[rep.state]
            for (const iterator of repositories) {
                if (iterator.id_repository === rep.id_repository) {
                    rep.verificationState = verificated_codes[iterator.state]
                }
            }
        }

        const repoFinal = []

        for (const repo of repositoryOp) {
            if (repo.coverage >= 75 && repo.state === 'Habilitado' && (repo.created_time).getFullYear() === new Date().getFullYear()) {
                repoFinal.push(repo)
            }
        }

        if (!repoFinal.length) throw new Error('La Tribu no tiene repositorios que cumplan con la cobertura necesaria')
        return repoFinal
}

const getTribe = async(id: any) => {
    try {
        const tribeOp = await Tribe.findOneById(id)
        if (!tribeOp) throw new Error('No se encontró la tribu')
        return tribeOp
    } catch (error) {
        throw { message: 'No se encontró la tribu', status: 404 }
    }
} 

export const repositoryMetricsByTribe = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const tribeOp = await getTribe(id)
        const repoFinal = await searchRepository(tribeOp)
        res.status(200).send({
            message: "Repository retrieved",
            repositories: repoFinal
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const generateReport = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const tribeOp = await getTribe(id)
        const repoFinal = await searchRepository(tribeOp)

        const csv = new ObjectsToCsv(repoFinal)
        await csv.toDisk('./public/report.csv')

        //EJECUTAR DESDE EL NAVEGADOR
        res.status(200).download(__dirname+'../../../public/report.csv', 'report.csv', (err) => {
            if (err) {
                console.log(err)
                throw { message: 'No se pudo generar el reporte', status: 404 }
            } else {
                console.log('Successfully downloaded')
            }
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}