import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'titulos_SE-validados',
    templateUrl    : './validados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitulosEspecialidadValidadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
