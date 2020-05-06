import Usuario, { IUsuario } from '../../model/Usuario'
import { UsuarioType } from '../../utils/types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Login = async(nombreDeUsuario, clave): Promise<object> => {
    const usuarioEncontrado:IUsuario  = await Usuario.findOne({ nombreDeUsuario : nombreDeUsuario})
    if(usuarioEncontrado){
        const isEqual: boolean = await bcrypt.compare(clave, usuarioEncontrado.clave)
        if(!isEqual){
            console.log('clave incorrecta')
        
        }else{
            let token = jwt.sign({
                nombreDeUsuario: usuarioEncontrado.nombreDeUsuario,
                id: usuarioEncontrado.id
            }, 
            'secret',
            { expiresIn: '1h' })

            return { token: token, id: usuarioEncontrado.id }
        }

    }else{
        return { error: "Nombre de usuario o clave incorrectos."}
    }
}

export const Logout = () => {
    
}