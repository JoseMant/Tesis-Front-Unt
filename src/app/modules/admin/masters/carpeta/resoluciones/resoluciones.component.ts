import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'resoluciones',
    templateUrl    : './resoluciones.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResolucionesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
