/* eslint-disable @typescript-eslint/naming-convention */
export interface CertificadoInterface
{
    nro_tramite: string;
    correo: string;
    costo: number;
    entidad: string;
    programa: string;
    exonerado_archivo: any;
    dependencia: string;
    fecha: string;
    fut: string;
    idPrograma: number;
    idTramite: number;
    idUnidad: number;
    idUsuario: number;
    motivo: string;
    nro_documento: string;
    nro_matricula: string;
    requisitos: any;
    solicitante: string;
    tramite: string;
    unidad: string;
    voucher: string;
    certificado_final?: string;
    idEstado_tramite?: number;
}
export interface CertificadoPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}
export interface UserInterface
{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    nro_doc?: string;
    idTipoUsuario: number;
    rol: string;
}
