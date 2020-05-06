import mongoose, { } from 'mongoose'
import { URI, DB_CONFIG } from '../utils/config'
import Grupo, { IGrupo } from '../model/Grupo'
import { AgregarUsuario } from '../case of use/admin/Usuario'
import { AgregarGrupo } from '../case of use/admin/Grupo'
import { UsuarioType, GrupoType } from '../utils/types'

const createDefaultAdminUser = async (id_grupo: mongoose.Schema.Types.ObjectId) => {
    const objUsuario: UsuarioType = {
        nombre: 'admin',
        apellido: '',
        email: '',
        nombreDeUsuario: 'admin',
        estado: 'nuevo',
        clave: 'root',
        grupo: id_grupo
    }
    let savedUsuario = await AgregarUsuario(objUsuario)
    
    console.log(`[APP] Usuario ${savedUsuario.nombreDeUsuario} establecido`)
}

const init = async():Promise<any> => {
    const result = await Grupo.findOne({})
    if(!result){
        const objGrupo:GrupoType = { nombre: "root" }
        let savedGrupo: IGrupo = await AgregarGrupo(objGrupo)
        createDefaultAdminUser(savedGrupo.id)   
    }

}
export const ApplicationRun = async(): Promise<any> => {
    console.log(`server running on port ${process.env.PORT}`)
    await mongoose.connect(URI, DB_CONFIG)
    init()
}