import Movimiento, { IMovimiento, IMovimientoConUsuario } from "../../model/Movimiento"

export const ListarMovimientos = async(): Promise<IMovimiento[]> => {
    let movimientos: IMovimiento[] = await Movimiento.find().populate('usuario', 'nombreDeUsuario')
    return movimientos
}