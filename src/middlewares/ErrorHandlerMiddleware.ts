import { ErrorRequestHandler } from "express"
import { IError } from "../utils/types"

const ErrorHandlerMiddleware: ErrorRequestHandler = (error: IError, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({ error: message, data: data })
}

export default ErrorHandlerMiddleware