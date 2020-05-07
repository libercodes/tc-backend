import mongoose, { Schema, Document } from 'mongoose'

export interface IMovimiento extends Document{
    fecha: Date,
    accion: string
    usuario: mongoose.Schema.Types.ObjectId
}

const MovimientoSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    accion: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
})
export default mongoose.model<IMovimiento>('Movimiento', MovimientoSchema, 'movimientos')