import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'reportes-tesoreria-aprobados',
    templateUrl    : './aprobados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportesTesoreriaAprobadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
