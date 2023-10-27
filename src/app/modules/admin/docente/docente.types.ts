/* eslint-disable @typescript-eslint/naming-convention */

export interface TramitesDocenteInterface
{
    idEstado_tramite:number;
    idTramite: number;
    idTramite_detalle: number; 
    idDocente: number; 
    archivo?: string;
    solicitante?:string;
    codigoDocente: number;
    departamentoDocente:string;
    tramite:string;
    nro_tramite?:number;
    fecha?:string;
    apellidos: string;
    nombres: string;
    idProfesion: number;
    idPais: number;
    sexo: string;
    fecha_nacimiento: string;
    direccion: string;
    pais: string;
    dni: string;
    telefono: string;
    celular: string;
    correo: string;
    correounitru?: string;
    requisitos: any;
    per_login?:any;
    cargo?: string;
    jefe?: number;
    idDependencia?: number;
    idDepartamento?: number;
    idSede?: number;
    idCategoria?: number;
    idDedicacion?: number;
    idTipo_tramite_unidad?:number;

}
export interface TramitesDocentePagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

