import { UsuarioType } from "../../utils/types"
import Usuario, { IUsuario } from "../../model/Usuario"
import  mongoose from "mongoose"
import bcrypt from 'bcrypt'

export const ConsultarUsuario = async(): Promise<IUsuario[]>=> {
    let usuarios: IUsuario[] = await Usuario.find()
    return usuarios
}

export const AgregarUsuario = async (usuario: UsuarioType ): Promise<IUsuario> => {
    const hashedPassword = await bcrypt.hash(usuario.clave, 12)
    usuario.clave = hashedPassword
    let objUsuario = new Usuario(usuario)
    let savedUser = await objUsuario.save()
    return savedUser
}

export const ModificarUsuario = async(usuario: UsuarioType): Promise<IUsuario> => {
    let usuarioEncontrado = await Usuario.findById(usuario._id)
    if (usuarioEncontrado) {
        usuarioEncontrado.nombre = usuario.nombre
        usuarioEncontrado.apellido = usuario.apellido
        usuarioEncontrado.email = usuario.email
        usuarioEncontrado.nombreDeUsuario = usuario.nombreDeUsuario
        usuarioEncontrado.clave = usuario.clave
        usuarioEncontrado.estado = usuario.estado
        usuarioEncontrado.grupo = usuario.grupo
        
        let updatedUser = await usuarioEncontrado.save()
        return updatedUser
    } else {
        throw new Error(`No se ha encontrado el usuario con id: ${usuario._id}`)
    }
}

export const EliminarUsuario = async(usuario_id: mongoose.Schema.Types.ObjectId): Promise<IUsuario> => {
    let deletedProduct = await Usuario.findByIdAndDelete(usuario_id)
    return deletedProduct
}