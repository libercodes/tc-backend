import { RequestHandler } from "express"
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
//Casos de uso
import Operaciones from '../case of use/admin/Operaciones'
//TYPES
import  { IUsuario } from "../model/Usuario"
import { UsuarioType, GrupoType, RequestWithCredentials } from "../utils/types"
import { IGrupo } from "../model/Grupo"
import { IMovimiento } from "../model/Movimiento"
import { ISesion } from "../model/Sesion"


export const ConsultarUsuario:RequestHandler = async( req: RequestWithCredentials, res, next ) => {
    try {
        let usuarios: IUsuario[] = await Operaciones.GestionarUsuario.ConsultarUsuario()
        res.json(usuarios)
    } catch (error) {
        error.message = "ocurrio un error al intentar cargar los usuarios"
        next(error)
    }
}

export const AgregarUsuario:RequestHandler = async( req, res, next ) => {

    const { nombre, apellido, email, nombreDeUsuario, grupo, clave } = req.body

    let objUsuario: UsuarioType = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        nombreDeUsuario: nombreDeUsuario,
        clave: clave,
        estado: 'nuevo',
        grupo: grupo
    }

    try {
        let response: IUsuario = await Operaciones.GestionarUsuario.AgregarUsuario(objUsuario)
        res.json({
            message: "usuario creado",
            usuario: response
        })
    } catch (error) {
        error.message = "Ocurrio un error al intentar agregar el usuario"
        next(error)
    }
}

export const ModificarUsuario:RequestHandler = async( req, res, next ) => {
    const { nombre, apellido, email, nombreDeUsuario, grupo, clave } = req.body
    const hashedPassword = await bcrypt.hash(clave, 12)

    let objUsuario:UsuarioType = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        nombreDeUsuario: nombreDeUsuario,
        clave: hashedPassword,
        estado: 'nuevo',
        grupo: grupo
    }

    try {
        let response = await Operaciones.GestionarUsuario.ModificarUsuario(objUsuario)
        res.json({
            message: "usuario actualizado",
            usuario_id: response.id
        })
    } catch (error) {
        error.message("Ocurrio un error al intentar actualizar el usuario")
        next(error)
    }
}

export const EliminarUsuario:RequestHandler = async( req, res, next ) => {
    const id: mongoose.Schema.Types.ObjectId = req.body.id

    try {
        let response = await Operaciones.GestionarUsuario.EliminarUsuario(id)
        res.json({
            message: "usuario eliminado",
            usuario_id: response.id
        })
    } catch (error) {
        error.message("Ocurrio un error al intentar eliminar el usuario")
        next(error)
    }
}

export const ConsultarGrupo:RequestHandler = async( req, res, next ) => {
    try {
        let grupos: IGrupo[] = await Operaciones.GestionarGrupo.ConsultarGrupo()
        res.json(grupos)
    } catch (error) {
        error.message = "Ocurrio un error al intentar cargar los grupos"
        next(error)
    }
}

export const AgregarGrupo:RequestHandler = async( req, res, next ) => {
    let objGrupo: GrupoType = { nombre: req.body.nombre }

    try {
        let response = await Operaciones.GestionarGrupo.AgregarGrupo(objGrupo)
        res.json({
            message: "grupo agregado",
            grupo_id: response
        })
    } catch (error) {
        error.message('ocurrio un error al intentar agregar el grupo')
        next(error)
    }
}

export const ModificarGrupo:RequestHandler = async( req, res, next ) => {
    let objGrupo: GrupoType = { nombre: req.body.nombre }
    
    try {
        let response = await Operaciones.GestionarGrupo.ModificarGrupo(objGrupo)
        res.json({
            message: "grupo modificado",
            grupo_id: response.id
        })
    } catch (error) {
        error.message('ocurrio un error al intentar actualizar el grupo')   
        next(error)
    }
}

export const EliminarGrupo:RequestHandler = async( req, res, next ) => {
    const id: any = req.params.id
    
    try {
        let response = await Operaciones.GestionarGrupo.EliminarGrupo(id)
        res.json({
            message: "grupo eliminado",
            grupo_id: response.id
        })
    } catch (error) {
        next(error)
    }
}

export const ConsultarMovimientos: RequestHandler = async( req, res, next ) => {
    try {
        let movimientos: IMovimiento[] = await Operaciones.GestionarMovimiento.ConsultarMovimientos()
        res.json(movimientos)
    } catch (error) {
        error.message('Ocurrio un error al intentar cargar los movimientos')
        next(error)
    }
}

export const ConsultarSesiones: RequestHandler = async( req, res, next ) => {
    try {
        let sesiones: ISesion[] = await Operaciones.GestionarSesion.ConsultarSesiones()
        res.json(sesiones)
    } catch (error) {
        error.message('Ocurrio un error al intentar cargar las sesiones')
        next(error)
    }
}

export const ObtenerDatosDeUnUsuario: RequestHandler = async( req: RequestWithCredentials, res, next) => {
    try {
        let response = await Operaciones.GestionarUsuario.ObtenerDatosDeUnUsuario(req.userId)
        res.json(response)
    } catch (error) {
        next(error)
    }
}