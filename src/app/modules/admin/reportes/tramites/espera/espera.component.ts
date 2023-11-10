import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'reportes-tramites-espera',
    templateUrl    : './espera.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReporteTramiteEsperaComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
