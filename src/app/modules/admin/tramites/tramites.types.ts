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
    entidad: string;
    nro_operacion: string;
    fecha_operacion: string;
    archivo: string;
    idFacultad: number;
    idEscuela: number;
    descipcion_estado?: string;
    idMotivo: number;
    apellidos: string;
    nombres: string;
    documento: string;
    celular: string;
    correo: string;
    sede: string;
    nro_matricula: string;
}
