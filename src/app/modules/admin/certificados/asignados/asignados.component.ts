import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'certificados-asignados',
    templateUrl    : './asignados.component.html',
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
