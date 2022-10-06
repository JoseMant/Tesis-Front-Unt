import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-aprobados',
    templateUrl    : './aprobados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosAprobadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
