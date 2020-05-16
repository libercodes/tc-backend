import Sesion, { ISesion } from "../../model/Sesion";
import { SesionType } from "../../utils/types";
import moment from 'moment'


export const AgregarSesion = async(sesion: SesionType): Promise<ISesion> => {
    let objSesion = new Sesion(sesion)
    let savedSesion:ISesion = await objSesion.save()
    return savedSesion
}

export const ModificarSesion = async(sesion: SesionType): Promise<ISesion> => {
    let sesionEncontrada: ISesion = await Sesion.findById(sesion._id)
    if (sesionEncontrada) {
        sesionEncontrada.usuario = sesion.usuario
        sesionEncontrada.fechaDeInicio = sesion.fechaDeInicio
        sesionEncontrada.fechaDeFinalizacion = sesion.fechaDeFinalizacion
        
        let updatedSesion: ISesion = await sesionEncontrada.save()
        return updatedSesion
    }
}