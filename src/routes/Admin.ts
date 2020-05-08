import express, { Router } from 'express'
///controllers
import * as adminController from '../controller/Admin'
//middlewares
import isLoggedIn from '../middlewares/isLoggedIn'
import VerificarPermisos from '../middlewares/VerificarPermisos'
import { ValidarInputsUsuario, ValidarInputsGrupo, CheckValidations } from '../middlewares/validations'
//utils
import actions from '../data/actions'
const router: Router = express.Router()

//USUARIO
router.get('/consultar-usuario', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_USUARIO.CONSULTAR_USUARIO),
    adminController.ConsultarUsuario
)

router.post('/agregar-usuario', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_USUARIO.AGREGAR_USUARIO),
    ValidarInputsUsuario,
    CheckValidations,
    adminController.AgregarUsuario
)

router.put('/modificar-usuario', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_USUARIO.MODIFICAR_USUARIO), 
    ValidarInputsUsuario,
    CheckValidations,
    adminController.ModificarUsuario
)

router.delete('/eliminar-usuario', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_USUARIO.ELIMINAR_USUARIO), 
    adminController.EliminarUsuario
)

//GRUPO
router.get('/consultar-grupo', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_GRUPO.CONSULTAR_GRUPO), 
    adminController.ConsultarGrupo
)


router.post('/agregar-grupo', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_GRUPO.AGREGAR_GRUPO), 
    ValidarInputsGrupo,
    CheckValidations,
    adminController.AgregarGrupo
)


router.put('/modificar-grupo', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_GRUPO.MODIFICAR_GRUPO), 
    ValidarInputsGrupo,
    CheckValidations,
    adminController.ModificarGrupo
)

router.delete('/eliminar-grupo', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_GRUPO.ELIMINAR_GRUPO), 
    adminController.EliminarGrupo
)

//MOVIMIENTOS
router.get('/movimientos', 
    isLoggedIn,VerificarPermisos(actions.GESTIONAR_MOVIMIENTO.CONSULTAR_MOVIMIENTO), 
    adminController.ConsultarMovimientos
)

//SESIONES
router.get('/sesiones', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_SESION.CONSULTAR_SESION), 
    adminController.ConsultarSesiones
)

export default router