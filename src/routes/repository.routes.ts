import { Router } from 'express'
import { createRepository, getRepositories, getRepositoryById, updateRepository, deleteRepository } from '../controllers/repository.controllers'
const router = Router()

router.post('/repositories', createRepository)
router.get('/repositories', getRepositories)
router.get('/repository/:id', getRepositoryById)
router.put('/repository/:id', updateRepository)
router.delete('/repository/:id', deleteRepository)

export default router