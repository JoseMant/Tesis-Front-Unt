export interface DuplicadosDiplomasInterface
{
    nro_tramite: string;
    correo: string;
    costo: number;
    entidad: string;
    programa: string;
    exonerado_archivo: any;
    facultad: string;
    fecha: string;
    fut: string;
    idPrograma: number;
    idTramite: number;
    idUnidad: number;
    idUsuario: number;
    motivo: string;
    sede: string;
    nro_documento: string;
    nro_matricula: string;
    requisitos: any;
    solicitante: string;
    tramite: string;
    unidad: string;
    voucher: string;
    // grado_final?: string;
    idEstado_tramite?: number;
    idTipo_tramite_unidad?: number;
    fecha_primera_matricula?: number;
    fecha_ultima_matricula?: number;
    certificado_final?: string;
    idResolucion?: number;
}
export interface DuplicadosDiplomasPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}