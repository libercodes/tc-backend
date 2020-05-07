import express, { Router } from 'express'
import * as adminController from '../controller/Admin'
import isLoggedIn from '../middlewares/isLoggedIn'

const router: Router = express.Router()

//USUARIO
router.get('/consultar-usuario', isLoggedIn, adminController.ConsultarUsuario)
router.post('/agregar-usuario', isLoggedIn, adminController.AgregarUsuario)
router.put('/modficar-usuario', isLoggedIn, adminController.ModificarUsuario)
router.delete('/eliminar-usuario', adminController.EliminarUsuario)

//ACCION
/* router.get('/consultar-accion', isLoggedIn, adminController.ConsultarAccion)
router.post('/agregar-accion', isLoggedIn, adminController.AgregarAccion)
router.put('/modificar-accion', isLoggedIn, adminController.ModificarAccion)
router.delete('/eliminar-accion', isLoggedIn, adminController.EliminarAccion) */

//GRUPO
router.get('/consultar-grupo', isLoggedIn, adminController.ConsultarGrupo)
router.post('/agregar-grupo', isLoggedIn, adminController.AgregarGrupo)
router.put('/modificar-grupo', isLoggedIn, adminController.ModificarGrupo)
router.delete('/eliminar-grupo', isLoggedIn, adminController.EliminarGrupo)

//PERMISO
/* router.get('/consultar-permiso', isLoggedIn, adminController.ConsultarPermiso)
router.post('/agregar-permiso', isLoggedIn, adminController.AgregarPermiso)
router.delete('/eliminar-permiso', isLoggedIn, adminController.EliminarPermiso) */

//MOVIMIENTOS
router.get('/movimientos', isLoggedIn, adminController.ConsultarMovimientos)

//SESIONES
router.get('/sesiones', isLoggedIn, adminController.ConsultarSesiones)


export default router