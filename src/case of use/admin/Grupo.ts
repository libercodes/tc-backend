import Grupo, { IGrupo } from "../../model/Grupo"
import { GrupoType } from "../../utils/types"
import Usuario from "../../model/Usuario"
import mongoose from 'mongoose'

const ValidarUsuariosAsociados = async(grupo_id: mongoose.Schema.Types.ObjectId): Promise<boolean> => {
    let usuarioEncontrado = await Usuario.findOne({ grupo: grupo_id })
    return usuarioEncontrado ? true : false
}

export const ConsultarGrupo = async(): Promise<IGrupo[]> => {
    try {
        let grupos: IGrupo[] = await Grupo.find()
        return grupos
    } catch (error) {
        console.error(error)
    }
}

export const AgregarGrupo = async(grupo :GrupoType): Promise<IGrupo> => {
    try {
        let objGrupo: IGrupo = new Grupo(grupo)
        let savedGrupo = await objGrupo.save()
        return savedGrupo
    } catch (error) {
        console.log('Ha ocurrido un error al intentar crear el grupo')
    }
}
export const ModificarGrupo = async(grupo: GrupoType): Promise<IGrupo> => {
    try {
        let grupoEncontrado: IGrupo = await Grupo.findById(grupo._id)
        if (grupoEncontrado) {
            grupoEncontrado.nombre = grupo.nombre
            try {
                let updatedGrupo: IGrupo = await grupoEncontrado.save()
                return updatedGrupo
            } catch (error) {
                console.error("Ocurrio un error al intentar actualizar el grupo.")
            }
        }
    } catch (error) {
        console.error(`No se ha encontrado el grupo ${grupo._id} que se intenta actualizar`)
    }
    //return grupo
}
export const EliminarGrupo = async(grupo_id: mongoose.Schema.Types.ObjectId): Promise<IGrupo> => {
    let poseeUsuarios = await ValidarUsuariosAsociados(grupo_id)
    if(!poseeUsuarios){
        try {
            let deletedGrupo:IGrupo = await Grupo.findByIdAndDelete(grupo_id)
            return deletedGrupo
        } catch (error) {
            console.error(error)
        }
    } else{
        //return { error: "No se puede eliminar un grupo con usuarios asociados"}
    }
}