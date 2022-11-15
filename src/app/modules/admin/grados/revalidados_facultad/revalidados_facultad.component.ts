import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-revalidados',
    templateUrl    : './revalidados_facultad.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosRevalidadosFacultadComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
