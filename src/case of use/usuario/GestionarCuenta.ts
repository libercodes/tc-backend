import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import Usuario, { IUsuario } from '../../model/Usuario'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { IError } from '../../utils/types'
import bcrypt from 'bcrypt'
dotenv.config()

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
})

export const ResetPassword = async(email: string): Promise<object> => {
    let usuarioEncontrado = await Usuario.findOne({ email: email })
    if(usuarioEncontrado){
        let payload =  usuarioEncontrado.id
        let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h'})

        smtpTransport.sendMail({
            to: email,
            from: process.env.MAIL_USER,
            subject: "Reestablecer clave",
            html: `
            <div>
                <h1>Reestablecer clave<h2>
                <p>Haga click en el siguiente enlace para poder reestablecer su clave</p>
                <a href=${process.env.URL_FRONTEND}/reset_password/${token}>Haz click aqui</a>
                <a href=${process.env.URL_FRONTEND}/reset_password/${token}> ${process.env.URL_FRONTEND}/reset_password/${token} </a/
                <h2>Este enlance es solamente valido por 2 horas.</h2>
            </div>

            `
        })
    }
    return { message: "Si el mail que propocionaste existe, entonces en breve te llegara un enlace para reestablecer tu clave"}
}

export const EstablecerNuevaClave = async (clave: string, token: string): Promise<IUsuario> => {
    
    let decodedToken: mongoose.Schema.Types.ObjectId = <mongoose.Schema.Types.ObjectId>jwt.verify(token, process.env.SECRET_KEY)
    if(!decodedToken){
        const error:IError = new Error('El enlace ha expirado')
        error.statusCode = 401
        throw error
    }
    let hashedPassword: string = await bcrypt.hash(clave, 12)
    let usuarioEncontrado: IUsuario = await Usuario.findById(decodedToken)
    usuarioEncontrado.clave = hashedPassword
    let usuarioActualizado: IUsuario = await usuarioEncontrado.save()
    return usuarioActualizado
}