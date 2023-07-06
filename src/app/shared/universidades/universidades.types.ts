/* eslint-disable @typescript-eslint/naming-convention */
export interface UniversidadInterface
{
    idUniversidad: number;
    codigo_sunedu: string;
    nombre: string;
    siglas: string;
    estado: number;
}

export interface UniversidadPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}
