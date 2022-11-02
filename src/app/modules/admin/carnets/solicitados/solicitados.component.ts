import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carnets-solicitados',
    templateUrl    : './solicitados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarnetsSolicitadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
