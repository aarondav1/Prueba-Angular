import { PerfilesInterface } from "./perfiles-interface";

export interface RespuestaApiPerfiles {
    code: string;
    message: string;
    status: number;
    data: PerfilesInterface[]
}
