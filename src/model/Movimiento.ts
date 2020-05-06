import mongoose, { Schema, Document } from 'mongoose'

export interface IMovimiento extends Document{
    fecha: Date,
    accion: mongoose.Schema.Types.ObjectId
    usuario: mongoose.Schema.Types.ObjectId
}

const MovimientoSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    accion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accion",
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
})
export default mongoose.model<IMovimiento>('Movimiento', MovimientoSchema, 'movimientos')