import mongoose from 'mongoose'
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

export interface GrupoType {
    _id?: mongoose.Schema.Types.ObjectId
    nombre: string
}

export interface AccionType {
    _id?: mongoose.Schema.Types.ObjectId
    nombre: string
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
    fechaDeFinalizacion: Date
}

export interface MovimientoType {
    _id?: mongoose.Schema.Types.ObjectId
    fecha: Date,
    accion: mongoose.Schema.Types.ObjectId
    usuario: mongoose.Schema.Types.ObjectId
}