import { Router } from 'express'
import { repositoryMetricsByTribe, generateReport} from '../controllers/consult.controllers'
const router = Router()

router.get('/repoMetbyTribe/:id', repositoryMetricsByTribe)
router.get('/generateReport/:id', generateReport)

export default router