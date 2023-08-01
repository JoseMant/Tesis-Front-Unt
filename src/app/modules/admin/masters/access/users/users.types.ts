export interface User
{
    // id: string;
    avatar?: string | null;
    background?: string | null;
    // name: string;
    // emails?: {
    //     email: string;
    //     label: string;
    // }[];
    // phoneNumbers?: {
    //     country: string;
    //     phoneNumber: string;
    //     label: string;
    // }[];
    // title?: string;
    // company?: string;
    // birthday?: string | null;
    // address?: string | null;
    // notes?: string | null;
    // tags: string[];
    idUsuario: number;
    idTipo_usuario: number;
    username: string;
    nombres: string;
    apellidos: string;
    tipo_documento: string;
    nro_documento: string;
    correo: string;
    celular:string;
    sexo: string;
    estado: boolean;
    idFacultad?: number;
    programas?: number[];
}

export interface Role
{
    id: number;
    nombre: string;
    estado: number;
}

export interface Unidad
{
    id?: string;
    title?: string;
}
