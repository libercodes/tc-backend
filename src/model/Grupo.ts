import mongoose, { Schema, Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export interface IGrupo extends Document{
    nombre: string,
    acciones?: string[]
}

const GrupoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    acciones: {
        type: [String],
        default: []
    }
})
GrupoSchema.plugin(uniqueValidator)
export default mongoose.model<IGrupo>('Grupo', GrupoSchema, 'grupos')