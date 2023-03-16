export interface Oficio
{
    avatar?: string | null;
    background?: string | null;
    idOficio: number;
    nro_oficio: string;
    fecha:string;
    resoluciones?: Resolucion[];
    estado: boolean;
}

export interface Resolucion
{
    idResolucion: number;
    nro_resolucion: string;
}
