import mongoose, { Schema, Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

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
        unique: true
    },
    nombreDeUsuario: {
        type: String,
        required: true,
        unique: true
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
UsuarioSchema.plugin(uniqueValidator)
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