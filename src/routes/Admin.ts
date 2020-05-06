import express, { Router } from 'express'
import * as adminController from '../controller/Admin'
const router: Router = express.Router()

//USUARIO
router.get('/consultar-usuario', adminController.ConsultarUsuario)
router.post('/agregar-usuario', adminController.AgregarUsuario)
router.put('/modficar-usuario', adminController.ModificarUsuario)
router.delete('/eliminar-usuario', adminController.EliminarUsuario)

//ACCION
router.get('/consultar-accion', adminController.ConsultarAccion)
router.post('/agregar-accion', adminController.AgregarAccion)
router.put('/modificar-accion', adminController.ModificarAccion)
router.delete('/eliminar-accion', adminController.EliminarAccion)

//GRUPO
router.get('/consultar-grupo', adminController.ConsultarGrupo)
router.post('/agregar-grupo', adminController.AgregarGrupo)
router.put('/modificar-grupo', adminController.ModificarGrupo)
router.delete('/eliminar-grupo', adminController.EliminarGrupo)

//PERMISO
router.get('/consultar-permiso', adminController.ConsultarPermiso)
router.post('/agregar-permiso', adminController.AgregarPermiso)
router.delete('/eliminar-permiso', adminController.EliminarPermiso)

//MOVIMIENTOS
router.get('/movimientos', adminController.ConsultarMovimientos)

//SESIONES
router.get('/sesiones', adminController.ConsultarSesiones)


export default router