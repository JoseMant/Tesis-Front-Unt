import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'resoluciones',
    templateUrl    : './duplicados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResolucionesDuplicadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
