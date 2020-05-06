import mongoose, { Schema, Document } from 'mongoose'

interface IPermiso extends Document{
    grupo: mongoose.Schema.Types.ObjectId,
    accion: mongoose.Schema.Types.ObjectId
}

const PermisoSchema = new Schema({
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo',
        required: true
    },
    accion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accion',
        required: true
    }
})

export default mongoose.model<IPermiso>('Permiso', PermisoSchema, 'permisos')



/* export default class Permiso{
    public id: string
    public grupo: Grupo
    public accion: Accion
} */