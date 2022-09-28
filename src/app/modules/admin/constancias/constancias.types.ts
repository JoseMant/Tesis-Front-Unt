/* eslint-disable @typescript-eslint/naming-convention */
export interface ConstanciaInterface
{
    codigo: string;
    correo: string;
    costo: number;
    entidad: string;
    escuela: string;
    exonerado_archivo: any;
    facultad: string;
    fecha: string;
    fut: string;
    idDependencia_detalle: number;
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
}
export interface ConstanciaPagination
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
