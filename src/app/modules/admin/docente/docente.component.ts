import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'inventory',
    templateUrl    : './docente.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocenteComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
