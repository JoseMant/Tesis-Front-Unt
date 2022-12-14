export interface Cronograma
{
    // id: string;
    avatar?: string | null;
    background?: string | null;
    idCronograma_carpeta: number;
    tipo_colacion: string;
    idUnidad: number;
    idTipo_tramite_unidad: number;
    idDependencia: number;
    fecha_colacion: string;
    fecha_cierre_alumno: string;
    fecha_cierre_secretaria:string;
    fecha_cierre_decanato: string;
    estado?: boolean;

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
