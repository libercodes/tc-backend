import express, { Router } from 'express'
import * as usuarioController from '../controller/Usuario'
//middlewares
import isLoggedIn from '../middlewares/isLoggedIn'
import { ValidarInputsLogin, ValidarInputsRecuperarClave } from '../middlewares/validations'
const router: Router = express.Router()

router.post('/login', ValidarInputsLogin, usuarioController.Login)
router.post('/logout', isLoggedIn, usuarioController.Logout)
router.put('/recuperar-clave', ValidarInputsRecuperarClave, usuarioController.RecuperarClave)


export default router