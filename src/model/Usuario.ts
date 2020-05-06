import mongoose, { Schema, Document } from 'mongoose'

export interface IUsuario extends Document{
    nombre: string
    apellido: string
    email: string
    nombreDeUsuario: string
    clave: string
    estado: string
    grupo?: mongoose.Schema.Types.ObjectId
}

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
    },
    email: {
        type: String,
    },
    nombreDeUsuario: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo'
    }
})

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema, 'usuarios')



/* export default class Usuario{
    constructor(){

    }
    public id: string
    public nombre: string
    public apellido: string
    public email: string
    public nombreDeUsuario: string
    public clave: string
    public estado: string
    public grupo: Grupo

} */