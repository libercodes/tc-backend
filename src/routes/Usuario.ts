import express, { Router } from 'express'
import * as usuarioController from '../controller/Usuario'
import isLoggedIn from '../middlewares/isLoggedIn'
const router: Router = express.Router()

router.post('/login', usuarioController.Login)
router.post('/logout', isLoggedIn, usuarioController.Logout)
router.put('/recuperar-clave', usuarioController.RecuperarClave)


export default router