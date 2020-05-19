import { RequestHandler } from "express"
import mongoose from 'mongoose'
//Casos de uso
import Operaciones from '../case of use/admin/Operaciones'
import * as OperacionesMovimientos from '../case of use/sistema/Movimiento'
//UTILS
import * as generadorDeMovimientos from '../utils/generadorMovimiento'
//TYPES
import  { IUsuario, IUsuarioSinClave } from "../model/Usuario"
import { UsuarioType, GrupoType, RequestWithCredentials } from "../utils/types"
import { IGrupo } from "../model/Grupo"
import Movimiento, { IMovimiento } from "../model/Movimiento"
import Sesion, { ISesion } from "../model/Sesion"


export const ListarUsuarios:RequestHandler = async( req: RequestWithCredentials, res, next ) => {
    try {
        let usuarios: IUsuarioSinClave[] = await Operaciones.GestionarUsuario.ListarUsuarios()
        res.json(usuarios)
    } catch (error) {
        error.message = "ocurrio un error al intentar cargar los usuarios"
        next(error)
    }
}

export const AgregarUsuario:RequestHandler = async( req: RequestWithCredentials, res, next ) => {

    const { nombre, apellido, email, nombreDeUsuario, grupo, clave } = req.body

    let objUsuario: UsuarioType = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        nombreDeUsuario: nombreDeUsuario,
        clave: clave,
        estado: 'Nuevo',
        grupo: grupo
    }

    try {
        let response: IUsuarioSinClave = await Operaciones.GestionarUsuario.AgregarUsuario(objUsuario)
        OperacionesMovimientos.AgregarMovimiento(req.userId, generadorDeMovimientos.AgregarUsuario(response))
        res.json({
            message: "El usuario ha sido agregado.",
            usuario: response
        })
    } catch (error) {
        error.message = "Ocurrio un error al intentar agregar el usuario"
        next(error)
    }
}

export const ModificarUsuario:RequestHandler = async( req: RequestWithCredentials, res, next ) => {
    const { nombre, apellido, email, nombreDeUsuario, grupo, _id, estado } = req.body

    let objUsuario:IUsuarioSinClave = {
        _id: _id,
        nombre: nombre,
        apellido: apellido,
        email: email,
        nombreDeUsuario: nombreDeUsuario,
        estado: estado,
        grupo: grupo
    }

    try {
        let response = await Operaciones.GestionarUsuario.ModificarUsuario(objUsuario)
        OperacionesMovimientos.AgregarMovimiento(req.userId, generadorDeMovimientos.ModificarUsuario(response, objUsuario))
        res.json({
            message: "El usuario ha sido actualizado.",
            usuario: response
        })
    } catch (error) {
        error.message("Ocurrio un error al intentar actualizar el usuario")
        next(error)
    }
}

export const EliminarUsuario:RequestHandler = async( req: RequestWithCredentials, res, next ) => {
    const id: any = req.params.id
    console.log(id)
    try {
        let response = await Operaciones.GestionarUsuario.EliminarUsuario(id)
        OperacionesMovimientos.AgregarMovimiento(req.userId, generadorDeMovimientos.EliminarUsuario(response))
        /* Sesion.deleteMany({ usuario: response._id })
        Movimiento.deleteMany({ usuario: response._id }) */
        res.json({
            message: "El usuario ha sido eliminado.",
            usuario_id: response._id
        })
    } catch (error) {
        error.message = "Ocurrio un error al intentar eliminar el usuario"
        next(error)
    }
}

export const ListarGrupos:RequestHandler = async( req, res, next ) => {
    try {
        let grupos: IGrupo[] = await Operaciones.GestionarGrupo.ListarGrupos()
        res.json(grupos)
    } catch (error) {
        error.message = "Ocurrio un error al intentar cargar los grupos"
        next(error)
    }
}

export const AgregarGrupo:RequestHandler = async( req: RequestWithCredentials, res, next ) => {
    let objGrupo: GrupoType = { nombre: req.body.nombre }
    
    try {
        let response = await Operaciones.GestionarGrupo.AgregarGrupo(objGrupo)
        OperacionesMovimientos.AgregarMovimiento(req.userId, generadorDeMovimientos.AgregarGrupo(response))
        res.json({
            message: "El grupo ha sido agregado correctamente.",
            grupo: response
        })
    } catch (error) {
        error.message('ocurrio un error al intentar agregar el grupo')
        next(error)
    }
}

export const ModificarGrupo:RequestHandler = async( req: RequestWithCredentials, res, next ) => {
    let objGrupo: GrupoType = { nombre: req.body.nombre, _id: req.body._id }
    try {
        let response = await Operaciones.GestionarGrupo.ModificarGrupo(objGrupo)
        OperacionesMovimientos.AgregarMovimiento(req.userId, generadorDeMovimientos.ModificarGrupo(response, objGrupo))
        res.json({
            message: "El grupo ha sido modificado correctamente",
            grupo: response
        })
    } catch (error) {
        error.message('ocurrio un error al intentar actualizar el grupo')   
        next(error)
    }
}

export const ModificarPermisos:RequestHandler = async( req: RequestWithCredentials, res, next ) => {
    let objGrupo: GrupoType = { acciones: req.body.acciones, _id: req.body._id }
    try {
        let response = await Operaciones.GestionarGrupo.ModificarPermisos(objGrupo)
        OperacionesMovimientos.AgregarMovimiento(req.userId, generadorDeMovimientos.ModificarPermisos(response, objGrupo))

        res.json({
            message: "Los permisos han sido modificados correctamente.",
            grupo: response
        })
    } catch (error) {
        error.message('ocurrio un error al intentar modificar los permisos del grupo')   
        next(error)
    }
}

export const EliminarGrupo:RequestHandler = async( req: RequestWithCredentials, res, next ) => {
    const id: any = req.params.id
    
    try {
        let response = await Operaciones.GestionarGrupo.EliminarGrupo(id)
        OperacionesMovimientos.AgregarMovimiento(req.userId, generadorDeMovimientos.EliminarGrupo(response))

        res.json({
            message: "grupo eliminado",
            grupo_id: response._id
        })
    } catch (error) {
        next(error)
    }
}

export const ListarMovimientos: RequestHandler = async( req, res, next ) => {
    try {
        let movimientos: IMovimiento[] = await Operaciones.GestionarMovimiento.ListarMovimientos()
        res.json(movimientos)
    } catch (error) {
        error.message('Ocurrio un error al intentar cargar los movimientos')
        next(error)
    }
}

export const ListarSesiones: RequestHandler = async( req, res, next ) => {
    try {
        let sesiones: ISesion[] = await Operaciones.GestionarSesion.ListarSesiones()
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