import express, { Application } from 'express'
import dotenv from 'dotenv'
import { ApplicationRun, crossOriginMiddleware } from './utils/config'
import adminRoutes from './routes/Admin'
dotenv.config()

const app: Application = express()

app.use(crossOriginMiddleware)
app.use('/api/admin', adminRoutes)


app.listen(process.env.PORT, ApplicationRun)