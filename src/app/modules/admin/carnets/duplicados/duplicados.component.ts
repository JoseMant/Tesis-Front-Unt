import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carnets-duplicados',
    templateUrl    : './duplicados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarnetsDuplicadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
