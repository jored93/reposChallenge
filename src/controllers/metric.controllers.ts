import { Request, Response } from "express"
import { Metric } from "../entity/Metric"
import { Repository } from "../entity/Repository"

export const createMetric = async (req: Request, res: Response) => {
    try {
        const { repository, coverage, bugs, vulnerabilities, hotspots, code_smells} = req.body

        const metric = new Metric()
        metric.id_repository = repository
        metric.coverage = coverage
        metric.bugs = bugs
        metric.vulnerabilities = vulnerabilities
        metric.hotspots = hotspots
        metric.code_smells = code_smells

        await metric.save()

        return res.json({
            message: "Metric created",
            data: metric
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const getMetrics = async (req: Request, res: Response) => {
    try {
        const metrics = await Metric.find()

        return res.json({
            message: "Metrics retrieved",
            data: metrics
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}


export const getMetricById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const metric = await Metric.findOneById(id)
        return res.json({
            message: "Metric retrieved",
            data: metric
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const updateMetric = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { repository, coverage, bugs, vulnerabilities, hotspots, code_smells} = req.body

    try {
        const metric = await Metric.findOneById(id)
        if (!metric) {return res.status(404).json({message: "Metric not found"})}

        const repositoryRelationship = await Repository.findOne({ where: { id_repository: repository}})
        if (!repositoryRelationship) {return res.status(404).json({message: "Repository not found"})}

        
        metric.id_repository = repository
        metric.coverage = coverage
        metric.bugs = bugs
        metric.vulnerabilities = vulnerabilities
        metric.hotspots = hotspots
        metric.code_smells = code_smells

        await metric.save()

        return res.json({
            message: "Metric updated",
            data: metric
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const deleteMetric = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const metric = await Metric.findOneById(id)

        if (!metric) {return res.status(404).json({message: "metric not found"})}

        await metric.remove()

        return res.json({
            message: "Metric deleted",
            data: metric
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}