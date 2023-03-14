import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'reportes-ura-validaciones',
    templateUrl    : './validaciones.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportesURAValidacionesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
