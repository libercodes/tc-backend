import mongoose, { Schema, Document } from 'mongoose'

interface ISesion extends Document{
    usuario: mongoose.Schema.Types.ObjectId
    fechaDeInicio: Date
    fechaDeFinalizacion: Date

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
        required: true
    }
})

export default mongoose.model<ISesion>('Sesion', SesionSchema, 'sesiones')



/* 
export default class Sesion{
    public id: string
    public usuario: Usuario
    public fechaDeInicio: Date
    public fechaDeFinalizacion: Date
} */