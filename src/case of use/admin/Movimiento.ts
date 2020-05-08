import Movimiento, { IMovimiento } from "../../model/Movimiento"

export const ConsultarMovimientos = async(): Promise<IMovimiento[]> => {
    let movimientos = await Movimiento.find({})
    return movimientos
}