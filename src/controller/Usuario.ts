import { RequestHandler } from "express"
import * as OperacionesSesion from '../case of use/usuario/Sesion'
import mongoose from 'mongoose'


export const Login:RequestHandler = async( req, res, next ) => {

    const nombreDeUsuario:string = req.body
    const clave:string = req.body

    const response: any = await OperacionesSesion.Login(nombreDeUsuario, clave)
    if (response.error) {
        res.json(response.error)
    }else{
        res.status(200).json(response)
    }
}
export const Logout:RequestHandler = async( req, res, next ) => {
    const sesion_id: mongoose.Schema.Types.ObjectId = req.body.id
    await OperacionesSesion.Logout(sesion_id)

    res.json({
        message: "Sesion Cerrada"
    })
}

export const RecuperarClave:RequestHandler = ( req, res, next ) => {

}