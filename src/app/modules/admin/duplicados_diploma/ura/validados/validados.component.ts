import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'duplicados-validados-ura',
    templateUrl    : './validados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuplicadosValidadosUraComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
