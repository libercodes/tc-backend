import jwt from 'jsonwebtoken'
import { IError, RequestWithCredentials, ITokenPayload } from '../utils/types'
import dotenv from 'dotenv'
dotenv.config()


export default async( req: RequestWithCredentials, res, next ) => {
    try {
        const authHeader: string = req.get('Authorization')
        if(!authHeader){
            throw new Error("not authenticated")
        }
        const token = authHeader.split(' ')[1]
        let decodedToken: ITokenPayload
        try {
            decodedToken = <ITokenPayload>jwt.verify(token, process.env.SECRET_KEY)    
        } catch (error) {
            error.statusCode = 500
            throw error
        }
        if(!decodedToken){
            const error: IError = new Error('No ha iniciado sesion')
            error.statusCode = 401
            throw error
        }
        req.sesionId = decodedToken.sesion
        req.userId = decodedToken.usuario
        req.grupoId = decodedToken.grupo
        next()
    } catch (error) {
        res.json({ error: "Not authenticated" })
    }

}

