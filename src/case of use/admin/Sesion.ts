import Sesion, { ISesion } from "../../model/Sesion"

export const ConsultarSesiones = async(): Promise<ISesion[]>=> {
    let sesiones = await 
        Sesion
            .find()
            .populate('usuario', 'nombreDeUsuario')
            .exec()
    return sesiones
}