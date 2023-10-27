/* eslint-disable @typescript-eslint/naming-convention */
export interface TramitesResolucionesInterface
{
    idEstado_tramite:number;
    idTramite: number;
    idTramite_detalle: number; 
    archivo?: string;
    solicitante?:string;
    tramite:string;
    nro_tramite?:number;
    fecha?:string;
    requisitos: any;
    idTipo_tramite_unidad?:number;
    nro_resolucion?:string;
    fecha_resolucion?:string;
    motivo?:string;
    observacion?:string;
    unidad?:string;
    dependencia?:string;
    programa?:string;


}
export interface TramitesResolucionesPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}
