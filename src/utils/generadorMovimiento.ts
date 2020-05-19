import { UsuarioType, GrupoType } from "./types"
import { IUsuarioSinClave } from "../model/Usuario"

export const AgregarUsuario = (usuario: IUsuarioSinClave) => {
    return `Se creo el usuario ${usuario.nombreDeUsuario} con el id: ${usuario.nombreDeUsuario}`
}

export const ModificarUsuario = (usuario: IUsuarioSinClave, usuarioAntiguo: IUsuarioSinClave) => {
    return `
        Se modifico el usuario ${usuario.nombreDeUsuario} con el id: ${usuario.nombreDeUsuario}.<br/>
        <br>
        <div class="d-flex flex-row">
            <div>
                <b>[Datos Anteriores]</b>
                <br/>
                <b>nombre:</b> ${usuarioAntiguo.nombre}<br/>
                <b>apellido:</b> ${usuarioAntiguo.apellido}<br/>
                <b>email:</b> ${usuarioAntiguo.email}<br/>
                <b>grupo:</b> ${usuarioAntiguo.grupo}<br/>
                <b>estado:</b> ${usuarioAntiguo.estado}<br/>
                <b>nombre de usuario:</b> ${usuarioAntiguo.nombreDeUsuario}<br/>
            </div>
            <br/>
            <div>
                <b>[Datos Nuevos]</b>
                <br/>
                <b>nombre:</b> ${usuario.nombre}<br/>
                <b>apellido:</b> ${usuario.apellido}<br/>
                <b>email:</b> ${usuario.email}<br/>
                <b>grupo:</b> ${usuario.grupo}<br/>
                <b>estado:</b> ${usuario.estado}<br/>
                <b>nombre de usuario:</b> ${usuario.nombreDeUsuario}
            </div>
        </div>
    `

}
export const EliminarUsuario = (usuario: IUsuarioSinClave) => {
    return `Se elimino el usuario ${usuario.nombreDeUsuario} con el id: ${usuario.nombreDeUsuario}`

}
export const AgregarGrupo = (grupo: GrupoType) => {
    return `Se creo el grupo ${grupo.nombre} con el id: ${grupo._id}`
}
export const ModificarGrupo = (grupo: GrupoType, grupoAntiguo: GrupoType) => {
    return `
        Se modifico el grupo ${grupo.nombre} con el id: ${grupo._id}<br/>
        <br/>
        [Datos Anteriores]<br/>
        <b>nombre:</b> ${grupoAntiguo.nombre}<br/>

        [Datos Nuevos]<br/>
        <b>nombre:</b> ${grupo.nombre}
    `
}
export const EliminarGrupo = (grupo: GrupoType) => {
    return `Se elimino el usuario ${grupo.nombre} con el id: ${grupo._id}`

}
export const ModificarPermisos = (grupo: GrupoType, grupoAntiguo: GrupoType) => {
        return `
        Se Modificaron los permisos del grupo ${grupo.nombre} con el id: ${grupo._id}
        <br/>
        <br/>
        <div class="d-flex flex-row">
            <div class="mx-2">
                <b>[Datos Anteriores]</b>
                <br/>
                <b>acciones:</b> <br/>
                ${grupoAntiguo.acciones.map(accion => `<br>${accion}`)}
            </div>
            <br/>
            <div class="mx-2">
                <b>[Datos Nuevos]</b>
                <br/>
                <b>acciones:</b> <br/>
                ${grupo.acciones.map(accion => `<br>${accion}`)}
            </div>
        </div>
`       
}