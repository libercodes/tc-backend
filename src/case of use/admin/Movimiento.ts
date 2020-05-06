import Movimiento, { IMovimiento } from "../../model/Movimiento"
import { MovimientoType } from "../../utils/types"

export const ConsultarMovimientos = async(): Promise<IMovimiento[]> => {
    try {
        let movimientos = await Movimiento.find({})
        return movimientos
    } catch (error) {
        console.error("ocurrio un error al intentar cargar los movimientos")
    }
}