/* eslint-disable @typescript-eslint/naming-convention */
export interface CertificadoInterface
{
    idTramite: number;
    // idEntidad: number;
    // nro_operacion: string;
    // fecha_operacion: string;
    // archivo: any;
    // des_estado_voucher: string;
    // idUsuario_aprobador: number;
    // validado: boolean;
    // estado: boolean;
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
