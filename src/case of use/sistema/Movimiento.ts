import Movimiento, { IMovimiento } from '../../model/Movimiento'
import { UsuarioType } from '../../utils/types'

export const AgregarMovimiento = async(usuario: UsuarioType, accion: string, fecha: Date): Promise<IMovimiento> => {
    let objMovimiento: IMovimiento = new Movimiento({ usuario: usuario._id, accion: accion, fecha: fecha })
    let savedMovimiento = await objMovimiento.save()
    return savedMovimiento
}


