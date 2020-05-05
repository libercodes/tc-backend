import Grupo from "./Grupo"



export default class Usuario{
    constructor(){

    }
    public id: string
    public nombre: string
    public apellido: string
    public email: string
    public nombreDeUsuario: string
    public clave: string
    public estado: string
    public grupo: Grupo

}