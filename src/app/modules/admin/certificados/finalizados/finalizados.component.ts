import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'certificados-finalizados',
    templateUrl    : './finalizados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificadosFinalizadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
