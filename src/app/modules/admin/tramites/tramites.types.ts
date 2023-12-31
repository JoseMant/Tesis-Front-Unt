/* eslint-disable @typescript-eslint/naming-convention */
export interface TramiteInterface
{
    idTramite?: number;
    idTipo_tramite: number;
    tipo_tramite?: string;
    nro_documento: string;
    idColacion: number;
    idEstado_tramite: number;
    idModalidad_grado: number;
    descripcion_estado: string;
    nro_tramite: string;
    entidad: string;
    nro_operacion: string;
    fecha_operacion: string;
    idDependencia: number;
    dependencia?: string;
    idSubdependencia: number;
    programa?: string;
    comentario?: string;
    idMotivo_certificado?: number;
    apellidos: string;
    nombres: string;
    documento: string;
    celular: string;
    correo: string;
    sede: string;
    nro_matricula: string;
    tipo_documento: string;
    sexoNombre: string;
    idUnidad: number;
    unidad?: string;
    idTipo_tramite_unidad: number;
    tipo_tramite_unidad?: string;
    tramite?: string;
    requisitos: any;
    archivoImagen: any;
    comentario_tramite: string;
    des_estado_voucher?: string;
    voucher?: string;
    archivoPdf?: any;
    archivoExonerado?: any;
    exonerado: boolean
    exonerado_archivo?: string;
    costo_exonerado?: number;
    comentario_voucher?: string;
    fut?: string;
    historial?: any;
    nro_resolucion?:string;
    fecha_resolucion?:string;
    motivo?:string;
}
