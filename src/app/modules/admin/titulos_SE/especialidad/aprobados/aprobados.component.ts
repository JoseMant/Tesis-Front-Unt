import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'titulos_SE-aprobados',
    templateUrl    : './aprobados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitulosEspecialidadAprobadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
