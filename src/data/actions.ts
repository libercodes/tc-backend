import { UsuarioType } from "../utils/types"
import Grupo, { IGrupo } from '../model/Grupo'


export default {
    GESTIONAR_USUARIO: {
        AGREGAR_USUARIO: "AGREGAR_USUARIO",
        MODIFICAR_USUARIO: "MODIFICAR_USUARIO",
        ELIMINAR_USUARIO: "ELIMINAR_USUARIO",
        CONSULTAR_USUARIO: "CONSULTAR_USUARIO"
    },
    GESTIONAR_GRUPO: {
        AGREGAR_GRUPO: "AGREGAR_GRUPO",
        MODIFICAR_GRUPO: "MODIFICAR_GRUPO",
        ELIMINAR_GRUPO: "ELIMINAR_GRUPO",
        CONSULTAR_GRUPO: "CONSULTAR GRUPO"
    },
    GESTIONAR_MOVIMIENTO: {
        CONSULTAR_MOVIMIENTO: "CONSULTAR_MOVIMIENTO"
    },
    GESTIONAR_SESION: {
        CONSULTAR_SESION: "CONSULTAR_SESION"
    }

}

export const VerificarPermisos = async function(user: UsuarioType, accion: string) {
    let grupoDelUsuario: IGrupo = await Grupo.findById(user.grupo)
    let hasPermission = grupoDelUsuario.acciones.indexOf(accion)

    return hasPermission === -1 ? false : true
}