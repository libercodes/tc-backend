import mongoose, { Schema, Document } from 'mongoose'

export interface ISesion extends Document{
    usuario: mongoose.Schema.Types.ObjectId
    fechaDeInicio: Date
    fechaDeFinalizacion?: Date

}
const SesionSchema = new Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaDeInicio: {
        type: Date,
        required: true
    },
    fechaDeFinalizacion: {
        type: Date,
    }
})

export default mongoose.model<ISesion>('Sesion', SesionSchema, 'sesiones')