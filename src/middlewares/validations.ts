import { body } from 'express-validator'

export const ValidarInputsUsuario = [
    body('nombre', 'El nombre debe tener entre 2 y 30 caracteres')
        .isString()
        .isLength({ min: 2, max: 30 })
        .trim(),
    body('apellido', 'El apellido debe tener entre 2 y 30 caracteres')
        .isString()
        .isLength({ min: 2, max: 30 })
        .trim(),
    body('email', 'Ingrese un email valido')
        .isEmail()
        .normalizeEmail(),
    body('nombreDeUsuario', 'Ingrese un nombre de usuario valido')
        .isString()
        .isLength({ min: 4, max: 30 }),
    body('clave', 'La clave debe ser entre 6 y 24 caracteres')
        .isString()
        .isLength({ min: 6, max: 24 })
]

export const ValidarInputsGrupo = [
    body('nombre', 'ingrese un nombre de grupo valido')
        .isString()
        .isLength({ min: 2, max: 15 })
        .trim()
]

export const ValidarInputsLogin = [
    body('nombreDeUsuario', 'Ingrese un nombre de usuario valido')
        .isString()
        .isLength({ min: 4, max: 30 }),
    body('clave')
        .isString()
        .isLength({ min: 6, max: 24 })
]

export const ValidarInputsRecuperarClave = [
    body('email', 'Ingrese un mail valido')
        .isEmail()
        .normalizeEmail()
]