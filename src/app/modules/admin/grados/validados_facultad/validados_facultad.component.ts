import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-validados',
    templateUrl    : './validados_facultad.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosValidadosFacultadComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
