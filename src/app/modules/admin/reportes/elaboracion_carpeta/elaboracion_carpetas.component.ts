import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'reportes-validados',
    templateUrl    : './elaboracion_carpetas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReporteCarpetasStatusTramitesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
