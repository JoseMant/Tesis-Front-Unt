import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-revalidados',
    templateUrl    : './revalidados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosFacultadRevalidadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
