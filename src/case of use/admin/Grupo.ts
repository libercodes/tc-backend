import Grupo, { IGrupo } from "../../model/Grupo"
import pool from '../../middlewares/database.js'
import { GrupoType } from "../../utils/types"


export const ConsultarGrupo = () => {
    
}
export const AgregarGrupo = async(grupo :GrupoType): Promise<IGrupo> => {
    try {
        let objGrupo = new Grupo(grupo)
        let savedGrupo = await objGrupo.save()
        return savedGrupo
    } catch (error) {
        console.log('Ha ocurrido un error al intentar crear el grupo')
    }
}
export const ModificarGrupo = async(grupo: GrupoType): Promise<GrupoType> => {
    return grupo
}
export const EliminarGrupo = async(grupo: GrupoType): Promise<GrupoType> => {
    return grupo
}