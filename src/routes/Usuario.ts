import express, { Router } from 'express'
import * as usuarioController from '../controller/Usuario'
const router: Router = express.Router()

router.post('login', usuarioController.Login)
router.post('logout', usuarioController.Logout)
router.put('recuperar-clave', usuarioController.RecuperarClave)


export default router