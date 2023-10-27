import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'resoluciones',
    templateUrl    : './graduados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResolucionesGraduadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
