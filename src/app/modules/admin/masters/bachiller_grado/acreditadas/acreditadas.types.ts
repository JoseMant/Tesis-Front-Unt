export interface Acreditada
{
    // id: string;
    avatar?: string | null;
    background?: string | null;
    idAcreditacion: number;
    idUnidad: number;
    idDependencia: number;
    fecha_inicio: string;
    fecha_fin: string;
    empresa_acreditadora: string;
    estado?: boolean;

}

// export interface Role
// {
//     id: number;
//     nombre: string;
//     estado: number;
// }

export interface Unidad
{
    id?: string;
    title?: string;
}
