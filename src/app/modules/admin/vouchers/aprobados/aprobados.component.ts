import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'vouchers-aprobados',
    templateUrl    : './aprobados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VouchersAprobadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
