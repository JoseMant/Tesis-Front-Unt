import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carpetas-pendientes',
    templateUrl    : './pendientes.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarpetasURAPendientesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
