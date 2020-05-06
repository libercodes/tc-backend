import Accion, { IAccion } from "../../model/Accion"
import { AccionType } from "../../utils/types"
import Permiso from "../../model/Permiso"
import mongoose from "mongoose"


const ValidarAparicionEnPermisos = async(accion_id: mongoose.Schema.Types.ObjectId): Promise<boolean> => {
    try {
        let permisoEncontrado = await Permiso.findOne({ accion: accion_id })
        return permisoEncontrado ? true : false
    } catch (error) {
        console.error(error)
    }
}

export const ConsultarAccion = async(): Promise<IAccion[]> => {
    try {
        let acciones = await Accion.find({})
        return acciones
    } catch (error) {
        console.error(error)
    }
}
export const AgregarAccion = async(accion: AccionType): Promise<IAccion> => {
    try {
        let objAccion = new Accion(accion)
        let savedAccion = await objAccion.save()
        return savedAccion
    } catch (error) {
        console.error(error)
    }
}
export const ModificarAccion = async(accion: AccionType): Promise<IAccion> => {
    try {
        let accionEncontrada = await Accion.findById(accion._id)
        if(accionEncontrada){
            accionEncontrada.nombre = accion.nombre
            try {
                let UpdatedAccion = await accionEncontrada.save()
                return UpdatedAccion
            } catch (error) {
                console.log('Ha ocurrido un error al intentar actualizar la accion')
                console.error(error)
            }
        }
    } catch (error) {
        console.log(`No se ha podido encontrar la accion que se intenta actualizar - id de la accion ${accion._id}`)
        console.error(error)
    }

    
}
export const EliminarAccion = async(accion_id: mongoose.Schema.Types.ObjectId): Promise<IAccion> => {
    try {
        let poseePermisos: boolean = await ValidarAparicionEnPermisos(accion_id)
        if (!poseePermisos) {
            let deletedAccion = await Accion.findByIdAndDelete(accion_id)
            return deletedAccion
        }
        //return { error: "No se puede eliminar una accion que tiene permisos asociados"}
    } catch (error) {
        console.error(error)
    }
}