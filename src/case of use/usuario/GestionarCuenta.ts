import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import Usuario from '../../model/Usuario'
import jwt from 'jsonwebtoken'
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
        let payload =  {
            id: usuarioEncontrado.id
        }
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

export const EstablecerNuevaClave = async () => {
    
}