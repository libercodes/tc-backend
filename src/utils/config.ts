import mysql, { ConnectionConfig } from 'mysql'

export const port: number = 5000;

export const URI: string = "mongodb://localhost:27017/gruposur"
export const TEST_URI: string = "mongodb://localhost:27017/gruposur-test"

export const DB_CONFIG: { useNewUrlParser: boolean, useUnifiedTopology: boolean } = { useNewUrlParser: true, useUnifiedTopology: true }

export const crossOriginMiddleware = (req,res,next): void => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
}


export const ApplicationRun = (): void => {
    console.log(`server running on port ${process.env.PORT}`)
}



// Sequellize => mySql
// MongoDriver => mongodb
// Mongoose => mongodb

// Answer => mysql driver