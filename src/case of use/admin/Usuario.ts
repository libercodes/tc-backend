import { UsuarioType } from "../../utils/types"
import Usuario, { IUsuario } from "../../model/Usuario"
import  mongoose from "mongoose"


export const ConsultarUsuario = async(): Promise<IUsuario[]>=> {
    try {
        let usuarios = await Usuario.find()
        return usuarios
    } catch (error) {
        console.log('Ha ocurrido un error al intentar cargar los usuarios')
    }
}
export const AgregarUsuario = async (usuario: UsuarioType ): Promise<IUsuario> => {
    let objUsuario = new Usuario(usuario)
    try {
        let savedUser = await objUsuario.save()
        return savedUser
    } catch (error) {
        console.log('Ha ocurrido un error al intentar crear el usuario')
    }
}
export const ModificarUsuario = async(usuario: UsuarioType): Promise<IUsuario> => {
    try {
        let usuarioEncontrado = await Usuario.findById(usuario._id)
        if (usuarioEncontrado) {
            usuarioEncontrado.nombre = usuario.nombre
            usuarioEncontrado.apellido = usuario.apellido
            usuarioEncontrado.email = usuario.email
            usuarioEncontrado.nombreDeUsuario = usuario.nombreDeUsuario
            usuarioEncontrado.clave = usuario.clave
            usuarioEncontrado.estado = usuario.estado
            usuarioEncontrado.grupo = usuario.grupo
            try {
                let updatedUser = await usuarioEncontrado.save()
                return updatedUser
            } catch (error) {
                console.log(`No se ha podido encontrar al usuario que se intenta actualizar - id de usuario ${usuario._id}`)
            }
        }
    } catch (error) {
        console.log('Ha ocurrido un error al intentar actualizar el usuario')
    }
    
}
export const EliminarUsuario = async(usuario_id: mongoose.Schema.Types.ObjectId): Promise<IUsuario> => {
    try {
        let deletedProduct = await Usuario.findByIdAndDelete(usuario_id)
        return deletedProduct 
    } catch (error) {
        console.log('Ha ocurrido un error al intentar eliminar el usuario')
    }
}