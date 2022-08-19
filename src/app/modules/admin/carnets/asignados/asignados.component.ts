import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carnets-asignados',
    templateUrl    : './asignados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarnetsAsignadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
