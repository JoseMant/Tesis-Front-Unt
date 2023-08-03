export interface User
{
    // id: string;
    avatar?: string | null;
    background?: string | null;
 
    tipo_documento: number;
    idUsuario: number;
    idTipo_usuario: number;
    username: string;
    nombres: string;
    apellidos: string;
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

export interface Tipo_documento
{
    id: number;
    nombre: string;
    estado: number;
}

