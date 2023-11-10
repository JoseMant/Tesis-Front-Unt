import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'revalidados-secretaria',
    templateUrl    : './revalidados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuplicadosRevalidadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
