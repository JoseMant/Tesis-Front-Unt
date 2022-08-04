import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'vouchers-rechazados',
    templateUrl    : './rechazados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VouchersRechazadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
