import mongoose, { Schema, Document } from 'mongoose'


export interface IGrupo extends Document{
    nombre: string
}

const GrupoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }
})

export default mongoose.model<IGrupo>('Grupo', GrupoSchema, 'grupos')




/* export default class Grupo{
    public id: string
    public nombre: string
} */