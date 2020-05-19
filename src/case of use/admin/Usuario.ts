import { UsuarioType, UsuarioConGrupo } from "../../utils/types"
import Usuario, { IUsuario, IUsuarioSinClave } from "../../model/Usuario"
import  mongoose from "mongoose"
import bcrypt from 'bcrypt'


export const ListarUsuarios = async(): Promise<IUsuarioSinClave[]>=> {
    let usuarios: IUsuarioSinClave[] = await Usuario.find().select('nombre apellido email nombreDeUsuario estado grupo').populate('grupo')
    return usuarios
}

export const AgregarUsuario = async (usuario: UsuarioType ): Promise<IUsuarioSinClave> => {
    const hashedPassword = await bcrypt.hash(usuario.clave, 12)
    usuario.clave = hashedPassword
    let objUsuario = new Usuario(usuario)
    let savedUser = await objUsuario.save()
    return savedUser.ObtenerUsuarioSinClave()
}

export const ModificarUsuario = async(usuario: IUsuarioSinClave): Promise<IUsuarioSinClave[]> => {
    let usuarioEncontrado: IUsuario = await Usuario.findById(usuario._id)
    if (usuarioEncontrado) {
        let usuarioAntiguo: IUsuario = { ...usuarioEncontrado.toObject() }
        usuarioEncontrado.nombre = usuario.nombre
        usuarioEncontrado.apellido = usuario.apellido
        usuarioEncontrado.email = usuario.email
        usuarioEncontrado.nombreDeUsuario = usuario.nombreDeUsuario
        usuarioEncontrado.estado = usuario.estado
        usuarioEncontrado.grupo = usuario.grupo
        
        let updatedUser: IUsuario = await usuarioEncontrado.save()
        return [ updatedUser.ObtenerUsuarioSinClave(), usuarioAntiguo ]
    } else {
        throw new Error(`No se ha encontrado el usuario con id: ${usuario._id}`)
    }
}

export const EliminarUsuario = async(usuario_id: any): Promise<IUsuarioSinClave> => {
    console.log(usuario_id)
    let deletedProduct = await Usuario.findByIdAndDelete(mongoose.Types.ObjectId(usuario_id))
    console.log(deletedProduct)
    return deletedProduct.ObtenerUsuarioSinClave()
}

export const ObtenerDatosDeUnUsuario = async(id: any) => {
    let usuarioEncontrado: any = await 
        Usuario
            .findById(id)
            .populate('grupo')
            .exec()

    if (usuarioEncontrado) {
        let payload: UsuarioConGrupo = {
            _id: usuarioEncontrado.id,
            nombreDeUsuario: usuarioEncontrado.nombreDeUsuario,
            nombre: usuarioEncontrado.nombreDeUsuario,
            apellido: usuarioEncontrado.apellido,
            email: usuarioEncontrado.email,
            estado: usuarioEncontrado.estado,
            grupo: usuarioEncontrado.grupo
        }
        return payload
    } else {
        throw new Error('Usuario no encontrado')
    }
}