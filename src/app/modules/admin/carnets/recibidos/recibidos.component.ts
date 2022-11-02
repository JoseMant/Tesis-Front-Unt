import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carnets-recibidos',
    templateUrl    : './recibidos.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarnetsRecibidosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
