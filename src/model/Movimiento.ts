import mongoose, { Schema, Document } from 'mongoose'

export interface IMovimiento extends Document{
    fecha: Date,
    descripcion: string
    usuario: mongoose.Schema.Types.ObjectId
}

export interface IMovimientoConUsuario{
    fecha: Date,
    descripcion: string
    usuario: {
        nombreDeUsuario: string
    }
}

const MovimientoSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    descripcion: {
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