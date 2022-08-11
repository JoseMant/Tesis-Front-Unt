import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'vouchers-pendientes',
    templateUrl    : './pendientes.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificadosAsignadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
