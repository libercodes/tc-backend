import mongoose, { Schema, Document, Model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { UsuarioType } from '../utils/types'
import Grupo, { IGrupo } from './Grupo'

export interface IUsuario extends Document{
    nombre: string
    apellido: string
    email: string
    nombreDeUsuario: string
    clave: string
    estado: string
    grupo: mongoose.Schema.Types.ObjectId

}

interface IUsuarioModel extends Model<IUsuario>{
    VerificarPermisos(user: mongoose.Schema.Types.ObjectId, action: string): Promise<boolean>
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

UsuarioSchema.statics.VerificarPermisos = async function(grupo: mongoose.Schema.Types.ObjectId, accion: string): Promise<boolean> {
    let grupoDelUsuario: IGrupo = await Grupo.findById(grupo)
    let hasPermission: number = grupoDelUsuario.acciones.indexOf(accion)

    return hasPermission === -1 ? false : true
}

const Usuario = mongoose.model<IUsuario, IUsuarioModel>('Usuario', UsuarioSchema, 'usuarios')
export default Usuario