import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-URA-diplomas',
    templateUrl    : './diplomas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosURADiplomasComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
