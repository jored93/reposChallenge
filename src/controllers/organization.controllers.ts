import { Request, Response } from "express"
import { Organization } from "../entity/Organization"

export const createOrganization = async (req: Request, res: Response) => {
    try {
        const { name } = req.body

        const organization = new Organization()
        organization.name = name
        await organization.save()

        return res.json({
            message: "Organization created",
            data: organization
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const getOrganizations = async (req: Request, res: Response) => {
    try {
        const organizations = await Organization.find()
        return res.json({
            message: "Organizations retrieved",
            data: organizations
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const getOrganizationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const organization = await Organization.findOneById(id)
        return res.json({
            message: "Organization retrieved",
            data: organization
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}


export const updateOrganization = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body

    try {
        const organization = await Organization.findOneById(id)
        
        if (!organization) {return res.status(404).json({message: "Organization not found"})}

        organization.name = name
        await organization.save()

        return res.json({
            message: "Organization updated",
            data: organization
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export const deleteOrganization = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const organization = await Organization.findOneById(id)

        if (!organization) {return res.status(404).json({message: "Organization not found"})}

        await organization.remove()

        return res.json({
            message: "Organization deleted"
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}