import { UsuarioInterface } from "./usuario-interface";

export interface RespuestaApiUsuario {
    code: string;
    message: string;
    status: number;
    data: UsuarioInterface[]
}
