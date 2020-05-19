import express, { Router } from 'express'
///controllers
import * as adminController from '../controller/Admin'
//middlewares
import isLoggedIn from '../middlewares/isLoggedIn'
import VerificarPermisos from '../middlewares/VerificarPermisos'
import { ValidarInputsUsuario, ValidarInputsGrupo, CheckValidations, ValidarInputsUsuarioModificar } from '../middlewares/validations'
//utils
import actions from '../data/actions'
const router: Router = express.Router()

//USUARIO
router.get('/obtener-usuario', 
    isLoggedIn,
    adminController.ObtenerDatosDeUnUsuario
)

router.get('/listar-usuarios', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_USUARIO.LISTAR_USUARIOS),
    adminController.ListarUsuarios
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
    ValidarInputsUsuarioModificar,
    CheckValidations,
    adminController.ModificarUsuario
)

router.delete('/eliminar-usuario/:id', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_USUARIO.ELIMINAR_USUARIO), 
    adminController.EliminarUsuario
)

//GRUPO
router.get('/listar-grupos', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_GRUPO.LISTAR_GRUPOS), 
    adminController.ListarGrupos
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

router.delete('/eliminar-grupo/:id', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_GRUPO.ELIMINAR_GRUPO), 
    adminController.EliminarGrupo
)

router.put('/modificar-permisos',
    isLoggedIn,
    VerificarPermisos(actions.GESTIONAR_GRUPO.MODIFICAR_GRUPO),
    adminController.ModificarPermisos
)
//MOVIMIENTOS
router.get('/movimientos', 
    isLoggedIn,VerificarPermisos(actions.GESTIONAR_MOVIMIENTO.LISTAR_MOVIMIENTOS), 
    adminController.ListarMovimientos
)

//SESIONES
router.get('/sesiones', 
    isLoggedIn, 
    VerificarPermisos(actions.GESTIONAR_SESION.LISTAR_SESIONES), 
    adminController.ListarSesiones
)

export default router