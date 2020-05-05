import Usuario from "./Usuario"

export default class Sesion{
    public id: string
    public usuario: Usuario
    public fechaDeInicio: Date
    public fechaDeFinalizacion: Date
}