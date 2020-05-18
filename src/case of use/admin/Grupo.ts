import Grupo, { IGrupo } from "../../model/Grupo"
import { GrupoType } from "../../utils/types"
import Usuario from "../../model/Usuario"
import mongoose from 'mongoose'

const ValidarUsuariosAsociados = async(grupo_id: mongoose.Schema.Types.ObjectId): Promise<boolean> => {
    let usuarioEncontrado = await Usuario.findOne({ grupo: grupo_id })
    return usuarioEncontrado ? true : false
}

export const ListarGrupos = async(): Promise<IGrupo[]> => {
    let grupos: IGrupo[] = await Grupo.find()
    return grupos
}

export const AgregarGrupo = async(grupo: GrupoType): Promise<IGrupo> => {
    let objGrupo: IGrupo = new Grupo(grupo)
    let savedGrupo = await objGrupo.save()
    return savedGrupo
}

export const ModificarGrupo = async(grupo: GrupoType): Promise<IGrupo> => {
    let grupoEncontrado: IGrupo = await Grupo.findById(grupo._id)
    if (grupoEncontrado) {
        grupoEncontrado.nombre = grupo.nombre
        grupoEncontrado.acciones = grupo.acciones ? grupo.acciones : grupoEncontrado.acciones


        let updatedGrupo: IGrupo = await grupoEncontrado.save()
        return updatedGrupo
    }else{
        throw new Error(`No se ha encontrado un grupo con el id ${grupo._id}`)
    }
}

export const EliminarGrupo = async(grupo_id: mongoose.Schema.Types.ObjectId): Promise<IGrupo> => {
    let poseeUsuarios = await ValidarUsuariosAsociados(grupo_id)
    if(!poseeUsuarios){
        let deletedGrupo:IGrupo = await Grupo.findByIdAndDelete(grupo_id)
        return deletedGrupo
    } else{
        throw new Error("No se puede eliminar un grupo con usuarios asignados")
    }
}