import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'titulos-pendientes',
    templateUrl    : './pendientes.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitulosURAPendientesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
