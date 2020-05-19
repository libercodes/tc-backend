import mongoose, { Document } from 'mongoose'
import { Request, RequestHandler, Response, NextFunction } from 'express';
import * as core from "express-serve-static-core";
import { IUsuario } from '../model/Usuario';

export interface UsuarioType{
    _id?: mongoose.Schema.Types.ObjectId
    nombre: string
    apellido: string
    email: string
    nombreDeUsuario: string
    clave: string
    estado: string
    grupo?: mongoose.Schema.Types.ObjectId
}
export interface UsuarioConGrupo  {
    _id: mongoose.Schema.Types.ObjectId
    nombre: string
    apellido: string
    email: string
    nombreDeUsuario: string
    estado: string
    grupo: GrupoType
}

export interface GrupoType {
    _id?: mongoose.Schema.Types.ObjectId
    nombre?: string,
    acciones?: string[]
}


export interface PermisoType {
    _id?: mongoose.Schema.Types.ObjectId
    grupo: mongoose.Schema.Types.ObjectId,
    accion: mongoose.Schema.Types.ObjectId
}
export interface SesionType {
    _id?: mongoose.Schema.Types.ObjectId
    usuario: mongoose.Schema.Types.ObjectId
    fechaDeInicio: Date
    fechaDeFinalizacion?: Date
}

export interface MovimientoType {
    _id?: mongoose.Schema.Types.ObjectId
    fecha: Date,
    accion: string
    usuario: mongoose.Schema.Types.ObjectId
}

export interface IError extends Error {
    statusCode?: number,
    data?: any
}

export interface ITokenPayload {
    sesion: mongoose.Schema.Types.ObjectId
    usuario: mongoose.Schema.Types.ObjectId
    grupo: mongoose.Schema.Types.ObjectId
}

export interface RequestWithCredentials extends Request{
    userId: mongoose.Schema.Types.ObjectId
    sesionId: mongoose.Schema.Types.ObjectId,
    grupoId: mongoose.Schema.Types.ObjectId

}

export interface RequestHandlerWithAction 
    <P extends 
        core.Params = core.ParamsDictionary, 
        ResBody = any, 
        ReqBody = any, 
        ReqQuery = core.Query,
        action = string
    >
    {
        (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction, action:string): any;

    }