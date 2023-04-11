export interface RespuestaApiMenu {
    code: string;
    message: string;
    status: number;
    data: {
        menu: string,
        pagina: string
    }[]
}
