export interface TableColumnsDefInterface {
    id: number;
    name: string;
    displayedName: string;
    estado?: string;
    type?:
        | 'string'
        | 'number'
        | 'date'
        | 'datetime'
        | 'boolean'
        | 'time'
        | 'acciones'
        | 'seleccionado'
        | 'accionesEvaluacionPe'
        | 'accionesDescarga'
        | 'estado'
        | 'moneda'
        | 'accionesObservacionPO'
        | 'construccion';
    backgroundColorTitle?: string;
    alignTitle?:
        | 'left'
        | 'center'
        | 'right'
        | 'fill'
        | 'justify'
        | 'centerContinuous'
        | 'distributed';
    alignContent?:
        | 'left'
        | 'center'
        | 'right'
        | 'fill'
        | 'justify'
        | 'centerContinuous'
        | 'distributed';
}
