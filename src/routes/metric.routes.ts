import { Router } from 'express'
import { createMetric, getMetrics, getMetricById, updateMetric, deleteMetric  } from '../controllers/metric.controllers'
const router = Router()

router.post('/metric', createMetric)
router.get('/metrics', getMetrics)
router.get('/metric/:id', getMetricById)
router.patch('/metric/:id', updateMetric)
router.delete('/metric/:id', deleteMetric)

export default router