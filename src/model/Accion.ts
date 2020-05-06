import mongoose, { Schema, Document } from 'mongoose'

interface IAccion extends Document {
    nombre: string
}
const AccionSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }
})

export default mongoose.model<IAccion>('Accion', AccionSchema, 'acciones')


/* 
export default class Accion{
    id: string
    nombre: string
} */