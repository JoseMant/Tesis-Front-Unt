import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'titulos_SE-especialidad-diplomas',
    templateUrl    : './diplomas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitulosEspecialidadDiplomasComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
