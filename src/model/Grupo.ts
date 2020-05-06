import mongoose, { Schema, Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export interface IGrupo extends Document{
    nombre: string
}

const GrupoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    }
})
GrupoSchema.plugin(uniqueValidator)
export default mongoose.model<IGrupo>('Grupo', GrupoSchema, 'grupos')


/* export default class Grupo{
    public id: string
    public nombre: string
} */