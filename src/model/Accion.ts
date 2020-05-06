import mongoose, { Schema, Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export interface IAccion extends Document {
    nombre: string
}
const AccionSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }
})

AccionSchema.plugin(uniqueValidator)
export default mongoose.model<IAccion>('Accion', AccionSchema, 'acciones')


/* 
export default class Accion{
    id: string
    nombre: string
} */