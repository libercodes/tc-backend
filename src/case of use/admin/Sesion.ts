import Sesion, { ISesion } from "../../model/Sesion"

export const ListarSesiones = async(): Promise<ISesion[]>=> {
    let sesiones = await 
        Sesion
            .find()
            .populate('usuario', 'nombreDeUsuario')
            .exec()
    return sesiones
}