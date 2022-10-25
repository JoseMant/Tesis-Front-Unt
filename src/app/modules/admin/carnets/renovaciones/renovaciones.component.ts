import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carnets-renovaciones',
    templateUrl    : './renovaciones.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarnetsRenovacionesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
