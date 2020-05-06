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
    nombre: string
}

export interface AccionType {
    nombre: string
}

export interface PermisoType {
    grupo: mongoose.Schema.Types.ObjectId,
    accion: mongoose.Schema.Types.ObjectId
}
export interface SesionType {
    usuario: mongoose.Schema.Types.ObjectId
    fechaDeInicio: Date
    fechaDeFinalizacion: Date
}