import { Router } from 'express'
import { createTribe, getTribes, getTribeById, updateTribe, deleteTribe } from '../controllers/tribe.controllers'
const router = Router()

router.post('/tribe', createTribe)
router.get('/tribes', getTribes)
router.get('/tribe/:id', getTribeById)
router.patch('/tribe/:id', updateTribe)
router.delete('/tribe/:id', deleteTribe)


export default router