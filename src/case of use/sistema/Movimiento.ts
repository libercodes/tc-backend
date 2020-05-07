import Movimiento, { IMovimiento } from '../../model/Movimiento'
import { UsuarioType } from '../../utils/types'

const AgregarMovimiento = async(usuario: UsuarioType, accion: string, fecha: Date): Promise<IMovimiento> => {
    try {
        let objMovimiento: IMovimiento = new Movimiento({ usuario: usuario._id, accion: accion, fecha: fecha })
        let savedMovimiento = await objMovimiento.save()
        return savedMovimiento
    } catch (error) {
        console.error("Ocurrio un error al intentar agregar el movimiento")
    }
}


