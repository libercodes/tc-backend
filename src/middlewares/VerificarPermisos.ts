import { RequestWithCredentials } from "../utils/types";
import Usuario from "../model/Usuario";


export default accion => async(req: RequestWithCredentials, res, next) => {
    try {
        const hasPermission = await Usuario.VerificarPermisos(req.grupoId, accion)
        if(!hasPermission){
            throw new Error("not authenticated")
        }else{
            next()
        }
    } catch (error) {
        res.json({ error: `No posee los permisos necesarios para realizar la siguiente accion: ${accion}`})
    }
}