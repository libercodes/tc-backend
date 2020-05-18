import Movimiento, { IMovimiento } from "../../model/Movimiento"

export const ListarMovimientos = async(): Promise<IMovimiento[]> => {
    let movimientos = await Movimiento.find({})
    return movimientos
}