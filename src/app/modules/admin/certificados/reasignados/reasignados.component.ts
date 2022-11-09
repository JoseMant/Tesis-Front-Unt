import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'certificados-reasignados',
    templateUrl    : './reasignados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificadosReasignadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
