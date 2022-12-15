import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-escuela-diplomas',
    templateUrl    : './diplomas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosEscuelaDiplomasComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
