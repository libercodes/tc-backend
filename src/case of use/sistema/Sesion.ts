import Sesion, { ISesion } from "../../model/Sesion";
import { SesionType } from "../../utils/types";



export const AgregarSesion = async(sesion: SesionType): Promise<ISesion> => {
    try {
        let objSesion = new Sesion(sesion)
        let savedSesion:ISesion = await objSesion.save()
        return savedSesion
    } catch (error) {
        console.error("Hubo un error al intentar registrar la sesion")
    }
}

export const ModificarSesion = async(sesion: SesionType): Promise<ISesion> => {
    try {
        let sesionEncontrada: ISesion = await Sesion.findById(sesion._id)
        if (sesionEncontrada) {
            sesionEncontrada.usuario = sesion.usuario
            sesionEncontrada.fechaDeInicio = sesion.fechaDeInicio
            sesionEncontrada.fechaDeFinalizacion = sesion.fechaDeFinalizacion

            try {
                let updatedSesion: ISesion = await sesionEncontrada.save()
                return updatedSesion
            } catch (error) {
                console.error(`Ocurrio un error al intentar actualizar la sesion ${sesion._id}`)
            }
        }
    } catch (error) {
        console.error(`No se encontro ninguna sesion con el id ${sesion._id}`)
    }
}