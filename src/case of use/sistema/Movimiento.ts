import Movimiento, { IMovimiento } from '../../model/Movimiento'
import { UsuarioType } from '../../utils/types'
import mongoose from 'mongoose'

export const AgregarMovimiento = async(usuario_id: mongoose.Schema.Types.ObjectId, descripcion: string ): Promise<IMovimiento> => {
    let objMovimiento: IMovimiento = new Movimiento({ usuario: usuario_id, descripcion: descripcion, fecha: new Date() })
    let savedMovimiento = await objMovimiento.save()
    return savedMovimiento
}


