import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carpetas-secretaria-validados',
    templateUrl    : './validados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarpetasSecretariaValidadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
