import express, { Router } from 'express'
import * as usuarioController from '../controller/Usuario'
//middlewares
import isLoggedIn from '../middlewares/isLoggedIn'
import { ValidarInputsLogin, ValidarInputsRecuperarClave, CheckValidations, ValidarClave } from '../middlewares/validations'
const router: Router = express.Router()

router.post('/login', 
    ValidarInputsLogin, 
    CheckValidations,
    usuarioController.Login
)

router.post('/logout', 
    isLoggedIn, 
    usuarioController.Logout
)

router.post('/recuperar-clave', 
    ValidarInputsRecuperarClave, 
    CheckValidations,
    usuarioController.RecuperarClave
)

router.put('/recuperar-clave',
    ValidarClave,
    CheckValidations,
    usuarioController.EstablecerNuevaClave
)


export default router