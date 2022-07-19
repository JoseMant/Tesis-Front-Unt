/* eslint-disable @typescript-eslint/naming-convention */
export interface CertificadoInterface
{
    idTipo_tramite: number;
    nro_documento: string;
    idColacion: number;
    idEstado_tramite: number;
    idModalidad_grado: number;
    descripcion_estado: string;
    codigo: string;
    idEntidad: number;
    nro_operacion: string;
    fecha_operacion: string;
    archivo: string;
    idFacultad: number;
    idEscuela: number;
    solicitud_certificado?: string;
    idMotivo_certificado: number;
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
    idTipo_tramite_unidad: number;
    archivo_firma: any;
    requisitos: any;
    archivoImagen: any;
}