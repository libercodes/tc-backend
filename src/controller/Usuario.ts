import { RequestHandler } from "express"
import Operaciones from '../case of use/usuario/Operaciones'
import mongoose from 'mongoose'


export const Login:RequestHandler = async( req, res, next ) => {
    const nombreDeUsuario:string = req.body.nombreDeUsuario
    const clave:string = req.body.clave

    try {
        const response: any = await Operaciones.GestionarSesion.Login(nombreDeUsuario, clave)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}
export const Logout:RequestHandler = async( req, res, next ) => {
    const sesion_id: mongoose.Schema.Types.ObjectId = req.body.id
    
    try {
        await Operaciones.GestionarSesion.Logout(sesion_id)
        res.json({
            message: "Sesion Cerrada"
        })
    } catch (error) {
        next(error)
    }
}

export const RecuperarClave:RequestHandler = async( req, res, next ) => {
    try {
        let response = await Operaciones.GestionarCuenta.ResetPassword(req.body.email)
        res.status(200).json(response)
    } catch (error) {
        error.message("Ocurrio un error por favor intente mas tarde.")
        next(error)
    }
}

export const EstablecerNuevaClave:RequestHandler = async( req, res, next ) => {
    
}