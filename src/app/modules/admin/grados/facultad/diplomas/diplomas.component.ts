import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-facultad-diplomas',
    templateUrl    : './diplomas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosFacultadDiplomasComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
