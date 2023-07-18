import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'reporte-carpetas',
    templateUrl    : './elaboracion_carpetas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReporteCarpetasComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
