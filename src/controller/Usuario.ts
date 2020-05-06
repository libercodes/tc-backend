import { RequestHandler } from "express"
import * as sesionHandler from '../case of use/usuario/Sesion'

export const Login:RequestHandler = async( req, res, next ) => {

    const nombreDeUsuario:string = req.body
    const clave:string = req.body

    const response: any = await sesionHandler.Login(nombreDeUsuario, clave)
    if (response.error) {
        res.json(response.error)
    }else{
        res.status(200).json(response)
    }
}
export const Logout:RequestHandler = ( req, res, next ) => {

}

export const RecuperarClave:RequestHandler = ( req, res, next ) => {

}