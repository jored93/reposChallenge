import { Request, Response } from "express"
import { Tribe  } from "../entity/Tribe"
import { Organization } from "../entity/Organization"

export const createTribe = async (req: Request, res: Response) => {
    try {
        const { name, organization } = req.body
        const orgRelationship = await Organization.findOne({ where: { id_organization: organization } })

        if (!orgRelationship) {
            return res.status(400).json({
                message: "Organization not found"
            })
        }

        const tribe = new Tribe()
        tribe.name = name
        tribe.organization = organization
        
        await tribe.save()

        return res.json({
            message: "Tribe created",
            data: tribe
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const getTribes = async (req: Request, res: Response) => {
    try {
        const tribes = await Tribe.find()
        if (tribes.length == 0) {
            return res.status(200).json({
                message: "No tribes registered"
            })
        }else{
            return res.json({
                message: "Tribes found",
                data: tribes
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

export const getTribeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const tribe = await Tribe.findOneById(id)
        return res.json({
            message: "Tribe retrieved",
            data: tribe
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}


export const updateTribe = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { organization, name } = req.body

    try {
        const tribe = await Tribe.findOneById(id)
        if (!tribe) {return res.status(404).json({message: "Tribe not found"})}

        const orgRelationship = await Organization.findOne({ where: { id_organization: organization}})
        if (!orgRelationship) {return res.status(404).json({message: "Organization not found"})}

        tribe.organization = organization
        tribe.name = name
        await tribe.save()

        return res.json({
            message: "Tribe updated",
            data: tribe
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const deleteTribe = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const tribe = await Tribe.findOneById(id)

        if (!tribe) {return res.status(404).json({message: "Tribe not found"})}

        await tribe.remove()

        return res.json({
            message: "Tribe deleted",
            data: tribe
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}