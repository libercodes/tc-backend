import Movimiento, { IMovimiento } from "../../model/Movimiento"
import { MovimientoType } from "../../utils/types"

export const ConsultarMovimientos = async(): Promise<IMovimiento[]> => {
    let movimientos = await Movimiento.find({})
    return movimientos
}