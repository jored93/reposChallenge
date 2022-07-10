import { Request, Response } from "express"
import { Repository } from "../entity/Repository"
import { Tribe } from "../entity/Tribe"

export const createRepository = async (req: Request, res: Response) => {
    try {
        const { name, tribe } = req.body
        const tribeRelationship = await Tribe.findOne({ where: { id_tribe: tribe } })

        if (!tribeRelationship) {
            return res.status(400).json({message: "Tribe not found"})
        }

        const repository = new Repository()
        repository.name = name
        repository.tribe = tribe
        await repository.save()

        return res.json({
            message: "Repository created",
            data: repository
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const getRepositories = async (req: Request, res: Response) => {
    try {
        const repositories = await Repository.find()
        if(repositories.length === 0) {
            return res.status(404).json({
                message: "No repositories registered"
            })
        } else {
            return res.json({
                message: "Repositories found",
                data: repositories
            })
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const getRepositoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const repository = await Repository.findOneById(id)
        return res.json({
            message: "Repository retrieved",
            data: repository
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const updateRepository = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { tribe, name, coverage } = req.body

    try {
        const repository = await Repository.findOneById(id)
        if (!repository) {return res.status(404).json({message: "Repository not found"})}

        const tribeRelationship = await Tribe.findOne({ where: { id_tribe: tribe}})
        if (!tribeRelationship) {return res.status(404).json({message: "Tribe not found"})}

        repository.tribe = tribe
        repository.name = name
        await repository.save()

        return res.json({
            message: "Repository updated",
            data: repository
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const deleteRepository = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const repository = await Repository.findOneById(id)

        if (!repository) {return res.status(404).json({message: "Repository not found"})}

        await repository.remove()

        return res.json({
            message: "Tribe deleted",
            data: repository
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}