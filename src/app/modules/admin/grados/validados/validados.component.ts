import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-validados',
    templateUrl    : './validados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosValidadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
