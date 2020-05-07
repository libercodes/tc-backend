/* import Permiso, { IPermiso } from "../../model/Permiso"
import { PermisoType } from "../../utils/types"
import mongoose from "mongoose"


export const ConsultarPermiso = async(): Promise<IPermiso[]> => {
    try {
        let permisos = await Permiso.find()
        return permisos
    } catch (error) {
        console.error("Ocurrio un error al intentar cargar los permisos")
    }
}
export const AgregarPermiso = async(permiso: PermisoType): Promise<IPermiso> => {
    try {
        let permisoEncontrado: IPermiso = await Permiso.findOne({ grupo: permiso.grupo, accion: permiso.accion })
        if(permisoEncontrado){
            console.error("Ya existe un permiso con ese grupo y accion")
        }else {
            try {
                let objPermiso = new Permiso(permiso)
                let savedPermiso = await objPermiso.save()
                return savedPermiso
            } catch (error) {
                console.error("Ha ocurrido un error al intentar crear el permiso")
            }
        }
    } catch (error) {
        console.error("No se pudo crear el permiso debido a que ya hay un permiso con ese grupo y esa accion")
    }
}

export const EliminarPermiso = async(permiso_id: mongoose.Schema.Types.ObjectId): Promise<IPermiso> => {
    try {
        let deletedPermiso = await Permiso.findByIdAndDelete()
        return deletedPermiso
    } catch (error) {
        console.error(`Ha ocurrido un error al intentar eliminar el permiso ${permiso_id}`)
    }
} */