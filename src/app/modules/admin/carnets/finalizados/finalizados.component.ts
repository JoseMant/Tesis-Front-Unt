import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carnets-finalizados',
    templateUrl    : './finalizados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarnetsFinalizadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
