import Sesion, { ISesion } from "../../model/Sesion"

export const ConsultarSesiones = async(): Promise<ISesion[]>=> {
    try {
        let sesiones = await Sesion.find({})
        return sesiones
    } catch (error) {
        console.error("Ha ocurrido un error al intentar cargar las sesiones")
    }
}