export interface Usuario
{
    idUsuario: number;
    avatar?: string | null;
    background?: string | null;    
    apellidos       : string,
    nombres         : string,
    celular         : string,
    correo          : string,
    nro_documento   : string,
    nro_matricula   : string,
    sexo            : string | null,
    tipo_documento  : string,
    username        : string,
    password        : string,
    idTipo_usuario  : number | null
}