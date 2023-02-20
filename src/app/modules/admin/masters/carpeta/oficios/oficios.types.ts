export interface Oficio
{
    avatar?: string | null;
    background?: string | null;
    idOficio: number;
    nro_oficio: string;
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

export interface Resolucion
{
    id: string;
    nro_resolucion: string;
}
