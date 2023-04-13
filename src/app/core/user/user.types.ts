/* eslint-disable @typescript-eslint/naming-convention */
export interface User
{
    id: string;
    name: string;
    correo: string;
    avatar?: string;
    status?: string;
    nro_doc?: string;
    // apellidos: "URBINA"
    // avatar: "assets/images/avatars/brian-hughes.jpg"
    // celular: "95426521"
    // correo: "curbina@unitru.edu.pe"
    // estado: 1
    idTipoUsuario: number;
    rol: string;
    // idUsuario: 2
    // nombres: "CESAR"
    // nro_documento: "74660603"
    idDependencia?: number;
    tipo_documento: string;
    username: string;
}
