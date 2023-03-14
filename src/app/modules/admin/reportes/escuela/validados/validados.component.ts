import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'reportes-validados',
    templateUrl    : './validados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportesEscuelaValidadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
