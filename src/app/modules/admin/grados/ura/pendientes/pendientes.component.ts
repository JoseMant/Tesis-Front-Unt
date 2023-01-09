import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-pendientes',
    templateUrl    : './pendientes.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosURAPendientesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
