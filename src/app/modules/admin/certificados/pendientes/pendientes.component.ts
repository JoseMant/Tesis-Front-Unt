import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'certificados-pendientes',
    templateUrl    : './pendientes.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificadosPendientesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
