import { Router } from 'express'
import { createOrganization, getOrganizations, getOrganizationById,updateOrganization, deleteOrganization } from '../controllers/organization.controllers'
const router = Router()

router.post('/organization', createOrganization)
router.get('/organizations', getOrganizations)
router.get('/organization/:id', getOrganizationById)
router.patch('/organization/:id', updateOrganization)
router.delete('/organization/:id', deleteOrganization)


export default router