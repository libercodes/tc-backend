import { RequestHandler } from "express"
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
//OPERACIONES
import * as OperacionesUsuario from '../case of use/admin/Usuario'
//import * as OperacionesAccion from '../case of use/admin/Accion'
import * as OperacionGrupo from '../case of use/admin/Grupo'
//import * as OperacionPermiso from '../case of use/admin/Permiso'
import * as OperacionMovimiento from '../case of use/admin/Movimiento'
import * as OperacionSesion from '../case of use/admin/Sesion'

//TYPES
import Usuario, { IUsuario } from "../model/Usuario"
import { UsuarioType, GrupoType, RequestWithCredentials } from "../utils/types"
//import { IAccion } from "../model/Accion"
import { IGrupo } from "../model/Grupo"
//import { IPermiso } from "../model/Permiso"
import { IMovimiento } from "../model/Movimiento"
import { ISesion } from "../model/Sesion"
import acciones from '../data/actions'
//import VerificarPermisos from '../middlewares/VerificarPermisos'
//import actions from "../data/actions"
export const ConsultarUsuario:RequestHandler = async( req: RequestWithCredentials, res, next ) => {
    //await VerificarPermisos(req,res,next, 'chatearusuarios')
    //const hasPermission = await Usuario.VerificarPermisos(req.grupoId, acciones.GESTIONAR_USUARIO.CONSULTAR_USUARIO)
    /* const hasPermission = await Usuario.VerificarPermisos(req.grupoId, 'aaaa')
    if(!hasPermission){
        console.error("No tienes permiso para realizar est accion")
        return
    }  */
    let usuarios: IUsuario[] = await OperacionesUsuario.ConsultarUsuario()
    res.json(usuarios)
}

export const AgregarUsuario:RequestHandler = async( req, res, next ) => {
    const { nombre, apellido, email, nombreDeUsuario, grupo, clave } = req.body

    let objUsuario:UsuarioType = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        nombreDeUsuario: nombreDeUsuario,
        clave: clave,
        estado: 'nuevo',
        grupo: grupo
    }

    let response: IUsuario = await OperacionesUsuario.AgregarUsuario(objUsuario)
    res.json({
        message: "usuario creado",
        usuario: response
    })
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

    let response = await OperacionesUsuario.ModificarUsuario(objUsuario)
    res.json({
        message: "usuario actualizado",
        usuario_id: response.id
    })
}

export const EliminarUsuario:RequestHandler = async( req, res, next ) => {
    const id: mongoose.Schema.Types.ObjectId = req.body.id

    let response = await OperacionesUsuario.EliminarUsuario(id)
    res.json({
        message: "usuario eliminado",
        usuario_id: response.id
    })
}

/* export const ConsultarAccion:RequestHandler = async( req, res, next ) => {
    let acciones = await OperacionesAccion.ConsultarAccion()
    res.json(acciones)
}

export const AgregarAccion:RequestHandler = async( req, res, next ) => {
    let objAccion: AccionType = { nombre: req.body.nombre }
    let response: IAccion = await OperacionesAccion.AgregarAccion(objAccion)

    res.json({
        message: "accion creada",
        accion: response
    })
}

export const ModificarAccion:RequestHandler = async( req, res, next ) => {
    let objAccion: AccionType = { nombre: req.body.nombre }
    let response: IAccion = await OperacionesAccion.ModificarAccion(objAccion)

    res.json({
        message: "accion actualizada",
        accion_id: response.id
    })
    
}

export const EliminarAccion:RequestHandler = async( req, res, next ) => {
    const id: mongoose.Schema.Types.ObjectId = req.body.id

    let response: IAccion = await OperacionesAccion.EliminarAccion(id)

    res.json({
        message: "accion eliminada",
        accion_id: response.id
    })
}
 */
export const ConsultarGrupo:RequestHandler = async( req, res, next ) => {
    let grupos: IGrupo[] = await OperacionGrupo.ConsultarGrupo()
    res.json(grupos)
}

export const AgregarGrupo:RequestHandler = async( req, res, next ) => {
    let objGrupo: GrupoType = { nombre: req.body.nombre }
    let response = await OperacionGrupo.AgregarGrupo(objGrupo)

    res.json({
        message: "grupo agregado",
        grupo_id: response
    })
}

export const ModificarGrupo:RequestHandler = async( req, res, next ) => {
    let objGrupo: GrupoType = { nombre: req.body.nombre }
    let response = await OperacionGrupo.ModificarGrupo(objGrupo)

    res.json({
        message: "grupo modificado",
        grupo_id: response.id
    })
}

export const EliminarGrupo:RequestHandler = async( req, res, next ) => {
    const id: mongoose.Schema.Types.ObjectId = req.body.id
    let response = await OperacionGrupo.EliminarGrupo(id)

    res.json({
        message: "grupo eliminado",
        grupo_id: response.id
    })
}

/* export const ConsultarPermiso:RequestHandler = async( req, res, next ) => {
    let permisos: IPermiso[] = await OperacionPermiso.ConsultarPermiso()
    res.json(permisos)
}

export const AgregarPermiso: RequestHandler = async( req, res, next ) => {
    let objPermiso:PermisoType = {
        grupo: req.body.grupo,
        accion: req.body.accion
    }

    let response = await OperacionPermiso.AgregarPermiso(objPermiso)

    res.json({
        message: "permiso actualizado",
        permiso_id: response.id
    })
}

export const EliminarPermiso:RequestHandler = async( req, res, next ) => {
    let id: mongoose.Schema.Types.ObjectId = req.body.id

    let response = await OperacionPermiso.EliminarPermiso(id)

    res.json({
        message: "permiso eliminado",
        permiso_id: response.id
    })
} */

export const ConsultarMovimientos: RequestHandler = async( req, res, next ) => {
    let movimientos: IMovimiento[] = await OperacionMovimiento.ConsultarMovimientos()
    res.json(movimientos)
}

export const ConsultarSesiones: RequestHandler = async( req, res, next ) => {
    let sesiones: ISesion[] = await OperacionSesion.ConsultarSesiones()
    res.json(sesiones)
}
