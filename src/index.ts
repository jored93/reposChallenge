require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { AppDataSource } from "./data-source"
import organizationRoutes from './routes/organization.routes'
import tribeRoutes from './routes/tribe.routes'
import repositoryRoutes from './routes/repository.routes'
import metricRoutes from './routes/metric.routes'
import consultRoutes from './routes/consult.routes'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(organizationRoutes)
app.use(tribeRoutes)
app.use(repositoryRoutes)
app.use(metricRoutes)
app.use(consultRoutes)

const main = async () => {
    try {
        await AppDataSource.initialize()
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()