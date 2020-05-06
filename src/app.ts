import express, { Application } from 'express'
import dotenv from 'dotenv'
import { crossOriginMiddleware } from './utils/config'
import { ApplicationRun } from './controller/Application'
import adminRoutes from './routes/Admin'
import usuarioRoutes from './routes/Usuario'
dotenv.config()

const app: Application = express()

app.use(crossOriginMiddleware)
app.use('/api/admin', adminRoutes)
app.use('/api', usuarioRoutes)


app.listen(process.env.PORT, ApplicationRun)