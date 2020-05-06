import dotenv from 'dotenv'
dotenv.config()
export const port: number = 5000;

export const URI: string = process.env.DB_URI
export const TEST_URI: string = "mongodb://localhost:27017/gruposur-test"

export const DB_CONFIG: { useNewUrlParser: boolean, useUnifiedTopology: boolean } = { useNewUrlParser: true, useUnifiedTopology: true }

export const crossOriginMiddleware = (req,res,next): void => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
}






// Sequellize => mySql
// MongoDriver => mongodb
// Mongoose => mongodb

// Answer => mysql driver