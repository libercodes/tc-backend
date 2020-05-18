import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
//utils
import Sesion, { ISesion } from '../../model/Sesion'
import * as OperacionSesion from '../sistema/Sesion'
import Usuario, { IUsuario } from '../../model/Usuario'
import { ITokenPayload } from '../../utils/types'
import Operaciones from '../admin/Operaciones'
dotenv.config()
import moment from 'moment'



const obtenerFechaFin = (fechaEstablecida: Date):Date => {
    let ahora = new Date()
   return ahora.getTime() <= fechaEstablecida.getTime() ? ahora : fechaEstablecida 
}


export const Login = async(nombreDeUsuario, clave): Promise<object> => {
    const usuarioEncontrado:IUsuario  = await Usuario.findOne({ nombreDeUsuario : nombreDeUsuario})
    if(usuarioEncontrado){
        const isEqual: boolean = await bcrypt.compare(clave, usuarioEncontrado.clave)
        if(!isEqual){
            throw new Error('Clave incorrecta.')
        }else{
            let fechaFin = new Date()
            fechaFin.setHours(fechaFin.getHours() + 1)

            let sesion = await OperacionSesion.AgregarSesion({ 
                usuario: usuarioEncontrado.id, 
                fechaDeInicio: new Date(), 
                fechaDeFinalizacion: fechaFin
            })
            const payload: ITokenPayload = {
                sesion: sesion.id,
                usuario: usuarioEncontrado.id,
                grupo: usuarioEncontrado.grupo
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
            let usuario = await Operaciones.GestionarUsuario.ObtenerDatosDeUnUsuario(usuarioEncontrado.id)
            return { token: "bearer " + token, usuario: usuario }
        }

    }else{
        throw new Error("Nombre de usuario o clave incorrectos.")
    }
}

export const Logout = async(sesion_id: mongoose.Schema.Types.ObjectId): Promise<ISesion> => {
    console.log('logout')
    let sesionEncontrada = await Sesion.findById(sesion_id)
    if(sesionEncontrada){
        console.log('sesion encontrada')
        let fechaFin: Date = obtenerFechaFin(sesionEncontrada.fechaDeFinalizacion)
        let sesion: ISesion = await OperacionSesion.ModificarSesion({
            usuario: sesionEncontrada.usuario, 
            fechaDeInicio: sesionEncontrada.fechaDeInicio,
            fechaDeFinalizacion: fechaFin,
            _id: sesion_id
        })
        return sesion
    }
}

