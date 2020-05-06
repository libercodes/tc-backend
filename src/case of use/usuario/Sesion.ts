import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
//utils
import Sesion from '../../model/Sesion'
import * as OperacionSesion from '../sistema/Sesion'
import Usuario, { IUsuario } from '../../model/Usuario'



const obtenerFechaFin = (fechaEstablecida: Date):Date => {
    let ahora = new Date()
   return ahora.getTime() <= fechaEstablecida.getTime() ? ahora : fechaEstablecida 
}


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
            
            let fechaFin = new Date()
            fechaFin.setHours(fechaFin.getHours() + 1)
            console.log(fechaFin)
            let sesion = await OperacionSesion.AgregarSesion({ usuario: usuarioEncontrado.id, fechaDeInicio: new Date(), fechaDeFinalizacion: fechaFin})

            return { token: token, id: usuarioEncontrado.id, sesion_id: sesion.id }
        }

    }else{
        return { error: "Nombre de usuario o clave incorrectos."}
    }
}

export const Logout = async(sesion_id: mongoose.Schema.Types.ObjectId): Promise<object> => {
    try {
        let sesionEncontrada = await Sesion.findById(sesion_id)
        if(sesionEncontrada){
    
            let fechaFin: Date = obtenerFechaFin(sesionEncontrada.fechaDeFinalizacion)
    
            let sesion = await OperacionSesion.ModificarSesion({
                usuario: sesionEncontrada.usuario, 
                fechaDeInicio: sesionEncontrada.fechaDeInicio,
                fechaDeFinalizacion: fechaFin
            })
    
            return sesion
        }
    } catch (error) {
        console.error(error)
    }
}