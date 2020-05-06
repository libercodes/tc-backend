import mongoose from 'mongoose'
export interface UsuarioType{
    _id?: string
    nombre: string
    apellido: string
    email: string
    nombreDeUsuario: string
    clave: string
    estado: string
    grupo?: mongoose.Schema.Types.ObjectId
}

export interface GrupoType {
    _id?: string
    nombre: string
}

export interface AccionType {
    _id?: string
    nombre: string
}

export interface PermisoType {
    _id?: string
    grupo: mongoose.Schema.Types.ObjectId,
    accion: mongoose.Schema.Types.ObjectId
}
export interface SesionType {
    _id?: string
    usuario: mongoose.Schema.Types.ObjectId
    fechaDeInicio: Date
    fechaDeFinalizacion: Date
}

export interface MovimientoType {
    _id?: string
    fecha: Date,
    accion: mongoose.Schema.Types.ObjectId
    usuario: mongoose.Schema.Types.ObjectId
}