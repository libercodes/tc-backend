import mongoose from 'mongoose'
import Movimiento, { IMovimiento } from '../../model/Movimiento'
import { UsuarioType, AccionType, MovimientoType } from '../../utils/types'

const AgregarMovimiento = async(usuario: UsuarioType, accion: AccionType, fecha: Date): Promise<IMovimiento> => {
    try {
        let objMovimiento = new Movimiento({ usuario: usuario._id, accion: accion._id, fecha: fecha })
        let savedMovimiento = await objMovimiento.save()
        return savedMovimiento
    } catch (error) {
        console.error("Ocurrio un error al intentar agregar el movimiento")
    }
}


