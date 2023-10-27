import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'duplicados-datos-diploma',
    templateUrl    : './diplomas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuplicadosDatosDiplomaComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
