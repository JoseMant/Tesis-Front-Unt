export interface Carpeta
{
    foto: string;
    nombres: string;
    apellidos: string;
    nro_documento: string;
    sede: string;
    facultad: string;
    programa: string;
    nro_matricula: string;
    denominacion: string;
    codigo_diploma: string;
    fecha_colacion: string;
    
    diploma_obtenido?:string;
    modalidadSustentancion?:string;
    nro_libro?:string;
    folio?:string;
    nro_registro?:string;
    nro_resolucion?:string;
}