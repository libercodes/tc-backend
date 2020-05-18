import { UsuarioType } from "../utils/types"
import Grupo, { IGrupo } from '../model/Grupo'


export default {
    GESTIONAR_USUARIO: {
        AGREGAR_USUARIO: "AGREGAR_USUARIO",
        MODIFICAR_USUARIO: "MODIFICAR_USUARIO",
        ELIMINAR_USUARIO: "ELIMINAR_USUARIO",
        LISTAR_USUARIOS: "LISTAR_USUARIOS"
    },
    GESTIONAR_GRUPO: {
        AGREGAR_GRUPO: "AGREGAR_GRUPO",
        MODIFICAR_GRUPO: "MODIFICAR_GRUPO",
        ELIMINAR_GRUPO: "ELIMINAR_GRUPO",
        LISTAR_GRUPOS: "LISTAR_GRUPOS"
    },
    GESTIONAR_MOVIMIENTO: {
        LISTAR_MOVIMIENTOS: "LISTAR_MOVIMIENTOS"
    },
    GESTIONAR_SESION: {
        LISTAR_SESIONES: "LISTAR_SESIONES"
    }

}

export const VerificarPermisos = async function(user: UsuarioType, accion: string) {
    let grupoDelUsuario: IGrupo = await Grupo.findById(user.grupo)
    let hasPermission = grupoDelUsuario.acciones.indexOf(accion)

    return hasPermission === -1 ? false : true
}