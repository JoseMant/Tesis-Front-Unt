export interface Resolucion
{
    avatar?: string | null;
    background?: string | null;
    idResolucion: number;
    nro_resolucion: string;
    fecha:string;
    archivo:any;
    archivoPdf?:any;
    estado: boolean;
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
