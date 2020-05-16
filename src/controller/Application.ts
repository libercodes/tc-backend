import mongoose, { } from 'mongoose'
import { URI, DB_CONFIG } from '../utils/config'
import Grupo, { IGrupo } from '../model/Grupo'
import { AgregarUsuario } from '../case of use/admin/Usuario'
import { AgregarGrupo } from '../case of use/admin/Grupo'
import { UsuarioType, GrupoType } from '../utils/types'
import actions from '../data/actions'

const createDefaultAdminUser = async (id_grupo: mongoose.Schema.Types.ObjectId) => {
    const objUsuario: UsuarioType = {
        nombre: 'liber',
        apellido: 'menna',
        email: 'libermenna@gmail.com',
        nombreDeUsuario: 'administrador',
        estado: 'nuevo',
        clave: 'root123',
        grupo: id_grupo
    }
    let savedUsuario = await AgregarUsuario(objUsuario)
    
    console.log(`[APP] Usuario ${savedUsuario.nombreDeUsuario} establecido`)
}

const init = async():Promise<any> => {
    const result = await Grupo.findOne({})
    if(!result){
        const objGrupo:GrupoType = { 
            nombre: "root",
            acciones: [
                actions.GESTIONAR_USUARIO.AGREGAR_USUARIO,
                actions.GESTIONAR_USUARIO.CONSULTAR_USUARIO,
                actions.GESTIONAR_USUARIO.MODIFICAR_USUARIO,
                actions.GESTIONAR_USUARIO.ELIMINAR_USUARIO,
                
                actions.GESTIONAR_GRUPO.AGREGAR_GRUPO,
                actions.GESTIONAR_GRUPO.CONSULTAR_GRUPO,
                actions.GESTIONAR_GRUPO.MODIFICAR_GRUPO,
                actions.GESTIONAR_GRUPO.ELIMINAR_GRUPO,
                
                actions.GESTIONAR_MOVIMIENTO.CONSULTAR_MOVIMIENTO,
                actions.GESTIONAR_SESION.CONSULTAR_SESION
            ]
        }
        let savedGrupo: IGrupo = await AgregarGrupo(objGrupo)
        createDefaultAdminUser(savedGrupo.id)   
    }

}
export const ApplicationRun = async(): Promise<any> => {
    console.log(`server running on port ${process.env.PORT}`)
    await mongoose.connect(URI, DB_CONFIG)
    init()
}