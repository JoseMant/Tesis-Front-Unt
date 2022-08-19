import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'carnets-aprobados',
    templateUrl    : './aprobados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarnetsAprobadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
